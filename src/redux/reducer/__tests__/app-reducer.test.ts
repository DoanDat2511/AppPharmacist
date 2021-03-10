import {
  createInitAppState,
  initApplicationReducer,
  setIndicatorReducer,
} from '../app-reducer';
import { AppStatus } from '../../redux-state';
import {
  initApplicationAction,
  updateAppLoadingAction,
} from '../../action/app-action';

describe('[Class Test]: app-reducer.ts', () => {
  describe('initApplicationReducer', () => {
    it('[Success Test]', async () => {
      const initalState = createInitAppState();
      // Test Loading
      const loadingAction = initApplicationAction(AppStatus.Loading);
      const loadingState = initApplicationReducer(initalState, loadingAction);
      expect(
        loadingState.equals(initalState.set('status', AppStatus.Loading)),
      ).toBe(true);
      // Loaded
      const loadedAction = initApplicationAction(AppStatus.Ready);
      const loadedState = initApplicationReducer(initalState, loadedAction);
      expect(
        loadedState.equals(initalState.set('status', AppStatus.Ready)),
      ).toBe(true);
    });

    it('[Failed Test]', async () => {
      const initalState = createInitAppState();
      // Test Loading
      const action = initApplicationAction(undefined);
      const newState = initApplicationReducer(initalState, action);
      expect(newState.get('status')).toBeUndefined();
    });
  });
  describe('setIndicatorReducer', () => {
    it('[Success Test]', async () => {
      const initalState = createInitAppState();
      // Test Loading
      const loadingAction = updateAppLoadingAction(true);
      const loadingState = setIndicatorReducer(initalState, loadingAction);
      expect(loadingState.equals(initalState.set('loading', true))).toBe(true);
      // Loaded
      const loadedAction = updateAppLoadingAction(false);
      const loadedState = setIndicatorReducer(initalState, loadedAction);
      expect(loadedState.equals(initalState.set('loading', false))).toBe(true);
    });
  });
});
