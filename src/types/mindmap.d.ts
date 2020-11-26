import React from "react";
export type INodeId = String | Number | Symbol;

export type INode = {
  id: INodeId;
  text?: String;
  showChildren?: Boolean;
  children?: INode[];
};

export type INodeRefs = Set<React.RefObject<HTMLDivElement>>;
