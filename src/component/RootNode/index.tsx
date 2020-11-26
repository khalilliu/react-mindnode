import React, { FC, RefObject, useEffect, useRef } from "react";
import { ROOT_PARENT } from "../../types/constant";
import { INode, INodeRefs } from "../../types/mindmap";
import { wrapper } from "./style";
import Node from "../Node";
import SubNode from "../SubNode";

type IProps = {
  layer: number;
  node: INode;
  node_refs: INodeRefs;
};

const RootNode: FC<IProps> = ({ layer, node, node_refs }) => {
  const root_node = useRef<HTMLDivElement>();
  const total = node.children.length;
  const half = total > 3 ? Math.trunc(total / 2) : total;
  useEffect(() => {
    root_node.current.scrollIntoView({ block: "center", inline: "center" });
  }, []);
  return (
    <div className={wrapper}>
      {/* 左边节点 */}
      <div>
        {node.showChildren &&
          node.children
            .slice(half)
            .map((sub_node) => (
              <SubNode
                key={sub_node.id as string}
                layer={layer + 1}
                node={sub_node}
                node_refs={node_refs}
                parent={node}
                left={true}
              />
            ))}
      </div>
      {/* 根节点 */}
      <div ref={root_node}>
        <Node
          layer={layer}
          node={node}
          node_refs={node_refs}
          parent={ROOT_PARENT}
        />
      </div>
      {/* 右边节点 */}
      <div>
        {node.showChildren &&
          node.children
            .slice(0, half)
            .map((sub_node) => (
              <SubNode
                key={sub_node.id as string}
                layer={layer + 1}
                node={sub_node}
                node_refs={node_refs}
                parent={node}
                left={false}
              />
            ))}
      </div>
    </div>
  );
};

export default RootNode;
