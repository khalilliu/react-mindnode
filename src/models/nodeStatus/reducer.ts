import { RootState, AC } from "../../types/store";
import { INode, INodeId } from "../../types/mindmap";
import {deepCopy} from '../../utils/helpers'

type ModuleState = RootState["nodeStatus"];
type IAC = AC<"nodeStatus">;

export function setSelect(
  payload: { nodeId: INodeId; selectByClick: boolean },
  moduleState: ModuleState,
  ac: IAC
) {
  console.log('set select')
  let newState = deepCopy(moduleState)
  if (newState.cur_select === payload.nodeId) {
    delete newState.cur_node_info;
  }
  newState.cur_select = payload.nodeId;
  newState.select_by_click = payload.selectByClick || false;
  newState.cur_edit = "";
  return newState
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
  let newState = deepCopy(moduleState)
  newState.cur_node_info = {
    ...moduleState.cur_node_info,
    ...payload.node,
    parent: payload.parent,
    left: payload.left
  };
  return newState;
}
