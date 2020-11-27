import { cx } from "@emotion/css";
import { useConcent } from "concent";
import React, { FC, useRef, RefObject, useEffect } from "react";
import { NodeType } from "../../types/constant";
import { INode, INodeRefs } from "../../types/mindmap";
import { handlePropagation } from "../../utils/helpers";
import InputDiv from "../InputDiv";
import Toolbar from "../Toolbar";

import {
  common_style,
  specific_style,
  selected_style,
  toggle_button,
  button_left,
  button_right,
  drop_area
} from "./style";

export type IProps = {
  layer: number;
  node: INode;
  node_refs: INodeRefs;
  parent: INode;
  left?: boolean;
};

const Node: FC<IProps> = ({ layer, node, node_refs, parent, left = false }) => {
  const self = useRef<HTMLDivElement>();
  const {
    connectedState: { nodeStatus, editPanel },
    dispatch,
  } = useConcent({ connect: ['mindmap',"nodeStatus", "editPanel"] });

  // 单击节点
  const handleSelectNode = () => {
    dispatch('nodeStatus/setSelect',{ nodeId: node.id, selectByClick: true });
  };

  // 双击节点
  const handleEditNode = () => {
    dispatch('nodeStatus/setEdit',{ nodeId: node.id });
  };

  // 显隐子节点
  const handleToggleChildren = () => {
    dispatch('mindmap/toggleChildren',{ nodeId: node.id });
    dispatch('nodeStatus/clearAll');
  };

  // 保存节点dom
  useEffect(() => {
    node_refs.add(self);
    return () => {
      node_refs.delete(self);
    };
  }, []);

  // 选中节点居中显示
  useEffect(() => {
    if (nodeStatus.cur_select === node.id) {
      self.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      });
      dispatch('nodeStatus/getNodeInfo',{ node: node, parent: parent, left: left });
    }
  }, [nodeStatus.cur_select, node]);

  return (
    <div
      className={cx(common_style, specific_style[layer < 3 ? layer : 3], {
        [selected_style]: nodeStatus.cur_select === node.id
      })}
      data-tag={left ? NodeType.LEFT_NODE : NodeType.RIGHT_NODE}
      data-parent={parent.id}
      data-show-children={node.showChildren}
      draggable={layer > 0 && nodeStatus.cur_edit !== node.id}
      id={node.id as string}
      ref={self}
      onClick={handlePropagation}
    >
      {nodeStatus.cur_edit === node.id && (
        <InputDiv nodeId={node.id}>{node.text}</InputDiv>
      )}
      {/* drop area */}
      <div
        className={drop_area}
        data-tag={NodeType.DROP_AREA}
        onClick={handleSelectNode}
        onDoubleClick={handleEditNode}
      ></div>
      <p>{node.text}</p>
      {layer > 0 && node.children.length > 0 && (
        <button
          className={cx(toggle_button, left ? button_left : button_right)}
          onClick={handleToggleChildren}
        >
          {node.showChildren ? "-" : "+"}
        </button>
      )}
      {nodeStatus.cur_select === node.id &&
        nodeStatus.select_by_click &&
        !editPanel.isShow && (
          <Toolbar layer={layer} node={node} parent={parent} />
        )}
    </div>
  );
};

export default Node;
