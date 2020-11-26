import { INode, INodeId } from "./mindmap";

export const ROOT_NODE_ID: INodeId = "root_node";
export const ROOT_PARENT: INode = { id: "", children: [] };
export const MINDMAP_ID = "rmind_mindmap_wrapper";
export const MINDMAP_MAIN = "rmind_main";

export enum stepConst {
  ZOOM_STEP = 0.02,
  MOVE_STEP = 0.1
}

export enum NodeType {
  LEFT_NODE = "node_left",
  RIGHT_NODE = "node_right",
  DROP_AREA = "drop_area"
}

export enum NodeText {
  NEW_NODE_TEXT = "新建节点",
  DEFAULT_TITLE = "未命名导图"
}

export enum Theme {
  THEME_MAIN = "--theme-main",
  THEME_LIGHT = "--theme-light",
  THEME_DARK = "--theme-dark",
  THEME_EX = "--theme-ex",
  THEME_ASSIST = "--theme-assist"
}
