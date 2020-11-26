import { INodeStatus } from "../../types/nodeStatus";

const defaultState: INodeStatus = {
  cur_select: "",
  select_by_click: false,
  cur_edit: "",
  cur_node_info: {}
};

export function getInitialState() {
  return defaultState;
}

export default getInitialState();
