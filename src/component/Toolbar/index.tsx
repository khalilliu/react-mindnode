import { useConcent } from "concent";
import React, { FC } from "react";
import {
  AddSubset,
  AddItem,
  Delete,
  Edit,
  DocAdd,
  SixPoints
} from "@icon-park/react";
import { INode } from "../../types/mindmap";
import { handlePropagation } from "../../utils/helpers";
import ToolButton from "../ToolButton";
import { wrapper } from "./style";

type IProps = {
  layer: number;
  node: INode;
  parent: INode;
};

const ToolBar: FC<IProps> = ({ layer, node, parent }) => {
  const { cr } = useConcent({ connect: ["mindmap", "nodeStatus"] });
  return (
    <div className={wrapper} onClick={handlePropagation}>
      <ToolButton text="添加子节点" icon={<AddSubset />}></ToolButton>
      <ToolButton text="添加兄弟节点" icon={<AddItem />}></ToolButton>
      <ToolButton text="删除" icon={<Delete />}></ToolButton>
      <ToolButton text="编辑" icon={<Edit />}></ToolButton>
      <ToolButton text="添加备注" icon={<DocAdd />}></ToolButton>
      <ToolButton text="显隐子节点" icon={<SixPoints />}></ToolButton>
    </div>
  );
};

export default ToolBar;
