import { cx } from "@emotion/css";
import React, { FC } from "react";
import { INodeId } from "../../types/mindmap";
import Node, { IProps } from "../Node";
import { wrapper, left_style } from "./style";

interface CombineProps extends IProps {
  key: INodeId;
}

const SubNode: FC<CombineProps> = ({
  layer,
  node,
  node_refs,
  parent,
  left
}) => {
  return (
    <div className={cx(wrapper, { [left_style]: left })}>
      <Node
        node={node}
        layer={layer}
        parent={parent}
        node_refs={node_refs}
        left={left}
      ></Node>
      <div>
        {node.showChildren &&
          node.children.length > 0 &&
          node.children.map((sub_node) => (
            <SubNode
              key={node.id as string}
              node={sub_node}
              layer={layer + 1}
              node_refs={node_refs}
              parent={sub_node}
              left={left}
            />
          ))}
      </div>
    </div>
  );
};

export default SubNode;
