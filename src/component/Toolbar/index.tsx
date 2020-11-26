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
  const { dispatch} = useConcent({module: "mindmap", connect: ["nodeStatus"] });

  const handleAddChild = () => {
    dispatch('mindmap/addChild',{nodeId: node.id})
  }
  const handleAddSibling = () => {}
  const handleDelete = () => {}
  const handleEdit = () => {}
  const handleAddInfo = () => {}
  const handleToggleChildren = () => {}

  return (
    <div className={wrapper} onClick={handlePropagation}>
      <ToolButton onClick={handleAddChild} text="添加子节点" icon={<AddSubset />}></ToolButton>
      <ToolButton onClick={handleAddSibling} text="添加兄弟节点" icon={<AddItem />}></ToolButton>
      <ToolButton onClick={handleDelete} text="删除" icon={<Delete />}></ToolButton>
      <ToolButton onClick={handleEdit} text="编辑" icon={<Edit />}></ToolButton>
      <ToolButton onClick={handleAddInfo} text="添加备注" icon={<DocAdd />}></ToolButton>
      <ToolButton onClick={handleToggleChildren} text="显隐子节点" icon={<SixPoints />}></ToolButton>
    </div>
  );
};

export default ToolBar;
