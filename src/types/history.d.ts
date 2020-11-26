import { INode } from "./mindmap";

export type SnapShot = {
  currentNode: INode;
  mindmap: string;
};

export type IHistory = {
  undo: SnapShot[];
  redo: SnapShot[];
  last_snapshot?: SnapShot;
};
