import { useConcent } from "concent";
import React, { FC, RefObject, useEffect, useRef } from "react";
import { INode, INodeRefs } from "../../types/mindmap";
import useResizeFn from "../../hooks/useResizeFn";
import drawLineCanvas from "../../utils/drawLineCanvas";
import { NodeDomMap } from "../../types/comp";
import { wrapper } from "./style";

type IProps = {
  parentRef: RefObject<HTMLDivElement>;
  mindmap: INode;
  nodeRefs: INodeRefs;
};

const LineCanvas: FC<IProps> = ({ parentRef, mindmap, nodeRefs }) => {
  const self = useRef<HTMLCanvasElement>();
  const {
    state,
    moduleComputed: { current_theme }
  } = useConcent("$$global");
  const renderLine = () => {
    const dom = self.current;
    dom.width = parentRef.current.offsetWidth;
    dom.height = parentRef.current.offsetHeight;
    const nodeDomMap: NodeDomMap = new Map(
      Array.from(nodeRefs).map((ref) => [
        ref.current.id,
        [
          ref.current.offsetLeft,
          ref.current.offsetLeft + ref.current.offsetWidth,
          ref.current.offsetTop + 0.5 * ref.current.offsetHeight,
          ref.current.dataset.tag
        ]
      ])
    );
    const ctx = dom.getContext("2d");
    drawLineCanvas(ctx, current_theme, mindmap, nodeDomMap);
  };
  // resize callback
  useResizeFn(renderLine);
  useEffect(renderLine, [mindmap, current_theme, state.zoom]);

  return <canvas ref={self} className={wrapper} />;
};

export default LineCanvas;
