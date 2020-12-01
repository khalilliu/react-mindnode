import React, {useRef, useCallback, useEffect, FC, RefObject} from 'react';
import { useConcent} from 'concent';
import useResizeFn from '../../hooks/useResizeFn';
import getDragEvents from '../../utils/getDragEvents';
import { MINDMAP_MAIN } from '../../types/constant';
import {wrapper} from './style';
import { INode } from '../../types/mindmap';
import { IGlobal, ITheme } from '../../types/global';

type IProps = {
  parentRef: RefObject<HTMLDivElement>,
  containerRef: RefObject<HTMLElement>,
  mindmap: INode,
  current_theme: ITheme,
  zoom: IGlobal['zoom'],
  x: IGlobal['x'],
  y: IGlobal['y']
}

const DragCanvas: FC<IProps> = ({parentRef, containerRef, mindmap: mindmapState, current_theme, zoom, x, y}) => {
  const self = useRef<HTMLCanvasElement>();
  const { mr: {moveNode} } = useConcent('mindmap')

  const handleResize = () => {
    const dom = self.current;
    dom.width = parentRef.current.offsetWidth
    dom.height = parentRef.current.offsetHeight
  }

  useEffect(() => {
    const handleDrag = getDragEvents(mindmapState, self.current, containerRef.current, current_theme, moveNode, zoom, {x,y});
    handleDrag.forEach(event => document.querySelector(`#${MINDMAP_MAIN}`).addEventListener(event.type, event.handler))
    return () => {
      handleDrag.forEach(event => document.querySelector(`#${MINDMAP_MAIN}`).removeEventListener(event.type, event.handler))
    }
  }, [mindmapState, current_theme, zoom, x, y])

  useEffect(handleResize, [mindmapState, zoom])
  useResizeFn(handleResize)

  return (
    <canvas ref={self} className={wrapper}></canvas>
  )
}


export default DragCanvas