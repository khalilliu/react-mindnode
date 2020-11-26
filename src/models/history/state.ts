import { IHistory } from "../../types/history";

const defaultState: IHistory = {
  undo: [],
  redo: [],
  last_snapshot: null
};

export function getInitialState() {
  return defaultState;
}

export default getInitialState();
