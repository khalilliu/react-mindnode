import { SnapShot } from "../../types/history";
import { RootState, AC } from "../../types/store";
import { deepCopy } from "../../utils/helpers";
import { getInitialState } from "./state";

type ModuleState = RootState["history"];
type IAC = AC<"history">;

/**
 * redo: 重做
 * undo: 撤销
 * last_snapshot: 当前记录
 */

export function setHistory(
  payload: SnapShot,
  moduleState: ModuleState,
  ac: IAC
): ModuleState {
  const newHistory = deepCopy(moduleState);
  if (newHistory.last_snapshot) {
    if (
      newHistory.undo.length > 0 &&
      newHistory.undo[newHistory.undo.length - 1].mindmap === payload.mindmap
    ) {
      // 点击撤销
      newHistory.redo.unshift(newHistory.last_snapshot);
      newHistory.undo.pop();
    } else if (
      newHistory.redo.length > 0 &&
      newHistory.redo[0].mindmap === payload.mindmap
    ) {
      // 点击重做
      newHistory.undo.push(newHistory.last_snapshot);
      newHistory.redo.shift();
    } else {
      newHistory.undo.push(newHistory.last_snapshot);
      newHistory.redo = [];
    }
  }
  newHistory.last_snapshot = { ...payload };
  return newHistory;
}

export function clearHistory(
  payload: any,
  moduleState: ModuleState,
  ac: IAC
): ModuleState {
  return getInitialState();
}
