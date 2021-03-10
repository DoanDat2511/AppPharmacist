import Immutable from "immutable";

export interface IScreenProps {
  setHudVisible?(visible: boolean): void;
  showAlert?(mess: string): void;
}

export interface IBaseProps {
  navigation?: any;
  screenProps?: IScreenProps;
  route?: any;
}
// create interfact IImuatableMap exetne Immutable Map(object) Generic Interface<R> để sử dụng
export interface IImmutableMap<R> extends Immutable.Map<keyof R, any> {
  toJS(): R;
  get<K extends keyof R>(key: K): R[K];
  set<K extends keyof R>(key: K, value: R[K]): this;
}
export enum ELanguage {
  English,
  Japanese,
  Korean,
  Vietnamese,
}

