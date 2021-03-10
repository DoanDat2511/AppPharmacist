import { Reducer, AnyAction } from 'redux';
import { put, call, cancelled } from 'redux-saga/effects';
import { Map, fromJS } from 'immutable';

export const REDUX_TYPE = '@@redux-type';
export const LOADING_TYPE = '@@redux-type/LOADING_TYPE';

export type TypeAction<Payload = any> = {
  type: string;
  payload: Payload;
};

export interface ITypeReducer<State> extends Reducer<State> {
  (state: State | undefined, action: AnyAction): State;
}

export interface ITypePartialReducer<Type, State> {
  (state: State, action: AnyAction): Partial<State> | undefined;
  type: Type;
}

export interface ITypeActionCreator<Type = string, Payload = any> {
  (args?: Payload): TypeAction<Payload>;
  type: Type;
  reducer<State>(
    reducer: (
      state: State,
      action: TypeAction<Payload>,
    ) => Partial<State> | undefined,
  ): ITypePartialReducer<Type, State>;
  isPending: <State>(store: State) => boolean;
}

export interface ITypeActionSagaCreator<Type, Payload, DONE = any>
  extends ITypeActionCreator<Type, Payload> {
  done: ITypeActionCreator<Type, DONE>;
}

export function createTypeAction<Payload = any>(
  type: string,
): ITypeActionCreator<string, Payload> {
  const actionCreator: any = (payload: Payload): TypeAction<Payload> => ({
    type,
    payload,
  });
  actionCreator.type = type;
  actionCreator.reducer = (reducer: any) => {
    reducer.type = type;
    return reducer;
  };
  return actionCreator;
}

export function createTypeSagaAction<Payload = any, DONE = any>(
  type: string,
): ITypeActionSagaCreator<string, Payload, DONE> {
  const doneType = 'DONE_' + type;
  const originalAction: any = createTypeAction<Payload>(type);
  originalAction.done = createTypeAction<DONE>(doneType);
  return originalAction;
}

export function createTypeReducer<State = Map<string, any>>(
  initialState: State | (() => State),
  ...handlers: ITypePartialReducer<string, State>[]
): ITypeReducer<State> {
  const partialReducersMap = handlers.reduce((r, reducer) => {
    (r[reducer.type] || (r[reducer.type] = [])).push(reducer);
    return r;
  }, {});
  const reducerMap = Object.keys(partialReducersMap).reduce((r, type) => {
    const partialReducers = partialReducersMap[type];
    r[type] = (state: Map<string, any>, action: AnyAction) => {
      return state.withMutations(temporaryState => {
        // Version 1
        // partialReducers.reduce<Immutable.Map<string, any>>((s, pr) => {
        //   pr(s, action);
        // }, temporaryState);
        // Version 2
        // partialReducers.forEach(element => {
        //   element(temporaryState, action);
        // });
        // Version 3 for better performance, I think.
        for (const rd of partialReducers) {
          rd(temporaryState, action);
        }
      });
    };
    return r;
  }, {});
  return (
    state: State = typeof initialState === 'function'
      ? (initialState as Function)()
      : initialState,
    action: any,
  ) => {
    const reducer = reducerMap[action.type];
    return reducer ? reducer(state, action) : state;
  };
}

export interface ITypeReduxPendingState {
  [REDUX_TYPE]: Map<string, any>;
}

export function createTypeReduxInitialState(): ITypeReduxPendingState {
  return {
    [REDUX_TYPE]: fromJS({}),
  };
}

export const typePendingReducerSet = {
  [REDUX_TYPE]: (
    state = fromJS({}),
    action = {} as AnyAction,
  ): typeof state => {
    if (action.type === LOADING_TYPE) {
      const currentCount = state.get(LOADING_TYPE) || 0;
      return state.set(
        LOADING_TYPE,
        !!action.payload ? currentCount + 1 : Math.max(0, currentCount - 1),
      );
    }
    return state;
  },
};

export function addSpinnerSaga(saga: (action?: any) => IterableIterator<any>) {
  return function* worker(action: AnyAction) {
    try {
      yield put({
        type: LOADING_TYPE,
        payload: true,
      });
      yield call(saga, action);
    } catch (e) {
      console.log(e);
    } finally {
      yield put({
        type: LOADING_TYPE,
        payload: false,
      });
    }
  };
}
