// import * as moduleCst from "../base/constant/moduleName";
import {
  ICtx,
  StateType,
  ComputedValType,
  ReducerType,
  MODULE_VOID,
  MODULE_DEFAULT,
  cst,
  IAnyObj,
  IActionCtx
} from "concent";
import * as models from "../models";

export const allModels = models;
type Models = typeof allModels;

/** 构造根State类型 */
export type RootState = {
  [cst.MODULE_DEFAULT]: {};
  [cst.MODULE_VOID]: {};
} & { [key in keyof Models]: StateType<Models[key]["state"]> };

/** 构造根Reducer类型 */
export type RootReducer = {
  [cst.MODULE_VOID]: {};
  [cst.MODULE_DEFAULT]: {};
} & {
  [key in keyof Models]: "reducer" extends keyof Models[key]
    ? Models[key]["reducer"] extends IAnyObj
      ? ReducerType<Models[key]["reducer"]>
      : {}
    : {};
};

export type RootComputed = {
  [cst.MODULE_VOID]: {};
  [cst.MODULE_DEFAULT]: {};
} & {
  [key in keyof Models]: "computed" extends keyof Models[key]
    ? Models[key]["computed"] extends IAnyObj
      ? ComputedValType<Models[key]["computed"]>
      : {}
    : {};
};

export type Modules = keyof RootState;

// ********************************
// 一些常用的基于Ctx封装的辅助类型
// ********************************

/** 为reducer函数生成actionCtx类型 */
export type AC<
  M extends Modules,
  FullState extends IAnyObj = RootState[M]
> = IActionCtx<RootState, RootComputed, M, CtxM<{}, M>, FullState>;

/** 属于某个模块 CtxM<P, M, Se, RefCu> */
export type CtxM<
  P = {},
  M extends Modules = MODULE_DEFAULT,
  Se = {},
  RefCu = {}
> = ICtx<
  RootState,
  RootReducer,
  RootComputed,
  P,
  {},
  M,
  MODULE_VOID,
  Se,
  RefCu
>;

/** 属于某个模块，扩展了私有状态时 CtxMS<P, M, St, Se, RefCu>*/
export type CtxMS<
  P = {},
  M extends Modules = MODULE_DEFAULT,
  St = {},
  Se = {},
  RefCu = {}
> = ICtx<
  RootState,
  RootReducer,
  RootComputed,
  P,
  St,
  M,
  MODULE_VOID,
  Se,
  RefCu
>;

/** 属于某个模块，连接了其他模块 CtxMConn<P, M, Conn, Se, RefCu> */
export type CtxMConn<
  P = {},
  M extends Modules = MODULE_DEFAULT,
  Conn extends Modules = MODULE_VOID,
  Se = {},
  RefCu = {}
> = ICtx<RootState, RootReducer, RootComputed, P, {}, M, Conn, Se, RefCu>;

/** 属于某个模块，扩展了私有状态，连接了其他模块 CtxMSConn<P, M, St, Conn, Se, RefCu>  */
export type CtxMSConn<
  P = {},
  M extends Modules = MODULE_DEFAULT,
  St = {},
  Conn extends Modules = MODULE_VOID,
  Se = {},
  RefCu = {}
> = ICtx<RootState, RootReducer, RootComputed, P, St, M, Conn, Se, RefCu>;

/** 扩展了私有状态，连接了其他模块 CtxMSConn<P, St, Conn, Se, RefCu>  */
export type CtxSConn<
  P = {},
  St = {},
  Conn extends Modules = MODULE_VOID,
  Se = {},
  RefCu = {}
> = ICtx<
  RootState,
  RootReducer,
  RootComputed,
  P,
  St,
  MODULE_DEFAULT,
  Conn,
  Se,
  RefCu
>;

/** 连接了其他模块 CtxConn<P, Conn, Se, RefCu> */
export type CtxConn<
  P = {},
  Conn extends Modules = MODULE_VOID,
  Se = {},
  RefCu = {}
> = ICtx<
  RootState,
  RootReducer,
  RootComputed,
  P,
  {},
  MODULE_DEFAULT,
  Conn,
  Se,
  RefCu
>;

// default系列，没有指定连接模块的组件默认属于$$default模块
export type CtxDe<P = {}, Se = {}, RefCu = {}> = CtxM<
  P,
  MODULE_DEFAULT,
  Se,
  RefCu
>;
export type CtxDeS<P = {}, St = {}, Se = {}, RefCu = {}> = CtxMS<
  P,
  MODULE_DEFAULT,
  St,
  Se,
  RefCu
>;
export type CtxDeSConn<
  P = {},
  St = {},
  Conn extends Modules = MODULE_VOID,
  Se = {},
  RefCu = {}
> = CtxMSConn<P, MODULE_DEFAULT, St, Conn, Se, RefCu>;
export type CtxDeConn<
  P = {},
  Conn extends Modules = MODULE_VOID,
  Se = {},
  RefCu = {}
> = CtxSConn<P, MODULE_DEFAULT, Conn, Se, RefCu>;

// ArrItemType
export type ItemsType<Arr> = Arr extends ReadonlyArray<infer E> ? E : never;
