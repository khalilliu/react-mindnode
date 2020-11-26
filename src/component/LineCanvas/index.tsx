import { useConcent } from "concent";
import React, { FC, RefObject, useEffect, useRef } from "react";
import { INode, INodeRefs } from "../../types/mindmap";
import useResizeFn from "../../hooks/useResizeFn";
import drawLineCanvas from "../../utils/drawLineCanvas";
import { NodeDomMap } from "../../types/comp";
import { wrapper } from "./style";
import { ITheme } from '../../types/global';

type IProps = {
  parentRef: RefObject<HTMLDivElement>;
  nodeRefs: INodeRefs;
  mindmap: INode,
  current_theme: ITheme,
  zoom: number
};

const LineCanvas: FC<IProps> = ({ parentRef, current_theme, zoom, mindmap, nodeRefs }) => {
  const self = useRef<HTMLCanvasElement>();
 
  const renderLine = () => {
    console.log('redraw')
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
  useResizeFn(() => renderLine());
  console.log(mindmap.children[0].children)
  useEffect(() => renderLine(), [mindmap, current_theme, zoom]);

  return <canvas ref={self} className={wrapper} />;
};

export default LineCanvas;
