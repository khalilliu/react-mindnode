import { INode, INodeId } from "./mindmap";

export type INodeStatus = {
  cur_select?: INodeId | null;
  select_by_click?: boolean | null;
  cur_edit?: INodeId | null;
  cur_node_info?: INode | object | null;
  parent?: INode | INodeId | null;
  left?: boolean;
};
