import { IEditPanel } from "../../types/editPanel";

const defaultState: IEditPanel = {
  isShow: false,
  nodeId: ""
};

export function getInitialState() {
  return defaultState;
}

export default getInitialState();
