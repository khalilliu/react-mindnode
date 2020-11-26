import React, { useRef, FC, useMemo, useEffect, RefObject } from "react";
import { useConcent } from "concent";
import RootNode from "../../component/RootNode";
import { MINDMAP_ID, MINDMAP_MAIN } from "../../types/constant";
import { wrapper } from "./style";
import { debounce } from "../../utils/helpers";
import getKeydownEvent from "../../utils/getKeydownEvent";
import useResizeFn from "../../hooks/useResizeFn";
import LineCanvas from "../../component/LineCanvas";
import { INodeRefs } from "../../types/mindmap";

const node_refs: INodeRefs = new Set<RefObject<HTMLDivElement>>();

type IProps = {
  container_ref: React.RefObject<HTMLElement>;
};
const Mindmap: FC<IProps> = ({ container_ref }) => {
  const self = useRef<HTMLDivElement>();
  const {
    state: mindmap,
    connectedState: { $$global: gState, nodeStatus },
    connectedComputed: {$$global: {current_theme}},
    cr
  } = useConcent({module: 'mindmap', connect: ["$$global",  "nodeStatus", "history"] });

  const mindmap_json = useMemo(() => JSON.stringify(mindmap), [mindmap]);

  // 键盘事件绑定
  useEffect(() => {
    const handleKeyDown = getKeydownEvent(cr, nodeStatus);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nodeStatus, cr]);

  // 点击画布清除节点状态
  useEffect(() => {
    const clearNodeStatus = () => {
      cr.nodeStatus.clearAll();
    };
    window.addEventListener("click", clearNodeStatus);
    return () => {
      window.removeEventListener("click", clearNodeStatus);
    };
  }, []);

  useResizeFn(() => {
    const normalizeXY =
      container_ref.current.clientWidth / container_ref.current.clientHeight;
    const getWheelDelta = (e: WheelEvent): number => {
      return e.deltaY;
    };
    const mousemoveInfo: {
      startX: number;
      startY: number;
      isKeydown: boolean;
    } = {
      startX: 0,
      startY: 0,
      isKeydown: false
    };

    const handleWheelEventWithKey = (e: WheelEvent) => {
      // if (e.type === "mousedown") {
      //   mousemoveInfo.isKeydown = true;
      // } else if (e.type === "mouseup") {
      //   mousemoveInfo.isKeydown = false;
      // }
      // if (!mousemoveInfo.isKeydown) {
      //   return;
      // }
      if (e.ctrlKey === true && e.deltaY) {
        e.preventDefault();
        e.stopPropagation();
        if (getWheelDelta(e) > 0) {
          cr.$$global.zoomIn();
        } else {
          cr.$$global.zoomOut();
        }
        return;
      }

      if (e.buttons === 1 && e.type === "mousedown") {
        mousemoveInfo.startX = e.clientX;
        mousemoveInfo.startY = e.clientY;
        return;
      }

      if (e.altKey && e.buttons === 1 && e.type === 'mousemove') {
        e.stopPropagation();
        console.log(mousemoveInfo,e.clientX,e.clientY)
        const { startX, startY } = mousemoveInfo;
        const moveX = e.clientX - startX;
        const moveY = e.clientY - startY;
        mousemoveInfo.startX = e.clientX;
        mousemoveInfo.startY = e.clientY;
        cr.$$global.moveXY({
          x: moveX / normalizeXY / 10,
          y: moveY / normalizeXY / 10
        });
      }
    };
    const eventHandler = (e: WheelEvent) => {
      try {
        handleWheelEventWithKey(e);
      } catch (error) {
        alert("移动或缩放功能错误" + error);
      }
    };
    document
      .querySelector(`#${MINDMAP_MAIN}`)
      .addEventListener("wheel", eventHandler);
    document
      .querySelector(`#${MINDMAP_MAIN}`)
      .addEventListener("mousemove", debounce(eventHandler, 20));
    document
      .querySelector(`#${MINDMAP_MAIN}`)
      .addEventListener("mousedown", eventHandler);
    document
      .querySelector(`#${MINDMAP_MAIN}`)
      .addEventListener("mouseup", eventHandler);
    return () => {
      document
        .querySelector(`#${MINDMAP_MAIN}`)
        .removeEventListener("wheel", eventHandler);
      document
        .querySelector(`#${MINDMAP_MAIN}`)
        .removeEventListener("mousemove", debounce(eventHandler, 20));
      document
        .querySelector(`#${MINDMAP_MAIN}`)
        .removeEventListener("mousedown", eventHandler);
      document
        .querySelector(`#${MINDMAP_MAIN}`)
        .addEventListener("mouseup", eventHandler);
    };
  });

  useEffect(() => {
    localStorage.setItem("mindmap", mindmap_json);
    cr.history.setHistory({
      mindmap: mindmap_json,
      currentNode: nodeStatus.cur_select || nodeStatus.cur_edit
    });
  }, [mindmap_json]);

  return (
    <div
      className={wrapper}
      ref={self}
      style={{
        zoom: gState.zoom,
        left: gState.x + "vw",
        top: gState.y + "vh"
      }}
      id={MINDMAP_ID}
      draggable={false}
    >
      <RootNode
        key={mindmap.id}
        layer={0}
        node={mindmap}
        node_refs={node_refs}
      />
      <LineCanvas current_theme={current_theme} zoom={gState.zoom} mindmap={{...mindmap}} parentRef={self} nodeRefs={node_refs} />
    </div>
  );
};

export default Mindmap;
