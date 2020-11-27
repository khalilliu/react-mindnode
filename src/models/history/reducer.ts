import { SnapShot } from "../../types/history";
import { RootState, AC } from "../../types/store";
import { getInitialState } from "./state";

type ModuleState = RootState["history"];
type IAC = AC<"history">;

/**
 * undo: 撤销 [上一步]
 * redo: 重做 [下一步]
 * last_snapshot: 当前记录
 */

export function setHistory(
  payload: SnapShot,
  moduleState: ModuleState,
  ac: IAC
): ModuleState {
  if (moduleState.last_snapshot) {
    if (
      moduleState.undo.length > 0 &&
      moduleState.undo[moduleState.undo.length - 1].mindmap === payload.mindmap
    ) {
      // 点击撤销
      moduleState.redo.unshift(moduleState.last_snapshot);
      moduleState.undo.pop();
    } else if (
      moduleState.redo.length > 0 &&
      moduleState.redo[0].mindmap === payload.mindmap
    ) {
      // 点击重做
      moduleState.undo.push(moduleState.last_snapshot);
      moduleState.redo.shift();
    } else {
      moduleState.undo.push(moduleState.last_snapshot);
      moduleState.redo = [];
    }
  }
  // 保存快照
  moduleState.last_snapshot = { ...payload };
  return moduleState;
}

export function clearHistory(
  payload: any,
  moduleState: ModuleState,
  ac: IAC
): ModuleState {
  return getInitialState();
}
