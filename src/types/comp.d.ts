import React from "react";
import { INodeId } from "./mindmap";
export type WithChildren<T = {}> = T & {
  children?: React.ReactElement;
};



export type NodeDomMap = Map<INodeId, [left:number, right:number, y:number, tag: string]>