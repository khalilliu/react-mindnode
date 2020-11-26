import { RootState, AC } from "../../types/store";
import { INode, INodeId } from "../../types/mindmap";
import { deepCopy } from "../../utils/helpers";

type ModuleState = RootState["nodeStatus"];
type IAC = AC<"nodeStatus">;

export function setSelect(
  payload: { nodeId: INodeId; selectByClick: boolean },
  moduleState: ModuleState,
  ac: IAC
): ModuleState {
  let nodeStatus = deepCopy(moduleState);
  if (nodeStatus.cur_select === payload.nodeId) {
    delete nodeStatus.cur_node_info;
  }
  nodeStatus.cur_select = payload.nodeId;
  nodeStatus.select_by_click = payload.selectByClick || false;
  nodeStatus.cur_edit = "";
  return nodeStatus;
}

export function setEdit(
  payload: { nodeId: INodeId },
  moduleState: ModuleState,
  ac: IAC
): ModuleState {
  return { cur_select: "", cur_edit: payload.nodeId, cur_node_info: {} as ModuleState["cur_node_info"] };
}

export function clearAll(
  payload: any,
  moduleState: ModuleState,
  ac: IAC
): ModuleState {
  return {
    cur_select: "",
    select_by_click: false,
    cur_edit: "",
  };
}

export function getNodeInfo(
  payload: { node: INode; parent: INode; left: boolean },
  moduleState: ModuleState,
  ac: IAC
): ModuleState {
  let nodeStatus = deepCopy(moduleState);
  nodeStatus.cur_node_info = {
    ...nodeStatus.cur_node_info,
    ...payload.node,
    parent: payload.parent,
    left: payload.left
  };
  return nodeStatus;
}
