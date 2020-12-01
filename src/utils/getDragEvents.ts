import {NodeType} from '../types/constant'
import {findNode} from './helpers'
import {drawDragCanvas} from './drawLineCanvas'
import { INode, INodeId } from '../types/mindmap'
import { ITheme } from '../types/global'


export type DragEventHandler = {
  type: 'dragstart' | 'drag' | 'dragleave' | 'dragover' | 'dragenter' | 'drop' | 'dragend',
   handler: EventListener | EventListenerObject
}

export type Position = {
  left?: number,
  right?: number,
  top?: number,
  bottom?: number
}

export function getDomOffsetById(id: string): Position {
  const el = document.getElementById(id)
  const left = el.offsetLeft, right = left + el.offsetWidth,
  top = el.offsetTop, bottom = top + el.offsetHeight;
  return {left, right, top, bottom}
}

export default (mindmap: INode, dragCanvas: HTMLCanvasElement, containerEl: HTMLElement, theme: ITheme, moveNode: any, zoom: number, drag: {x: number, y: number}): DragEventHandler[] => {

  let nodeId: INodeId, 
    parentId: INodeId, 
    targetId: INodeId, 
    isSibling: boolean, 
    children: INodeId[][], 
    childrenOffsetLeft: number[], 
    childrenOffsetRight: number[], 
    childrenOffsetTop:number[][],
    parentOffset:undefined | Position, 
    parentIsRoot: boolean, 
    containerLeft: number, 
    containerTop: number, 
    containerWidth: number, 
    containerHeight: number, 
    inDropArea: boolean;

  const reset = () => {
    nodeId = '';
    parentId = ''; 
    targetId = ''; 
    isSibling = false;
    children = []; 
    childrenOffsetLeft = []; 
    childrenOffsetRight = []; 
    childrenOffsetTop = [];
    parentOffset = undefined; 
    parentIsRoot = false; 
    containerLeft = containerEl.scrollLeft; 
    containerTop = containerEl.scrollTop - 56;  
    containerWidth = containerEl.offsetWidth;  
    containerHeight = containerEl.offsetHeight;  
    inDropArea = false
  }

  const handleContainerScroll: EventListener = (ev): void => {
    containerLeft = containerEl.scrollLeft;
    containerTop = containerEl.scrollTop - 56;
  }

  return [
    {
      // 开始拖动
      type: 'dragstart',
      handler: (ev: DragEvent) => {
        console.log('======= start drag =======', ev.target)
        reset();
        containerEl.addEventListener('scroll', handleContainerScroll);
        if(ev.target && ((ev.target) as HTMLDivElement).dataset.tag === NodeType.LEFT_NODE || ((ev.target) as HTMLDivElement).dataset.tag === NodeType.RIGHT_NODE) {
          console.log('run this')
          nodeId = ((ev.target) as HTMLDivElement).id;
          parentId = ((ev.target) as HTMLDivElement).dataset.parent;
          const parent = findNode(mindmap, parentId);
          console.log(nodeId, parentId)
          parentIsRoot = parent === mindmap;
          parentOffset = getDomOffsetById(parentId as string)
          children[0] = parent.children.map(child => child.id)
          let childrenOffset: Position[][] = [];
          childrenOffset[0] = children[0].map(getDomOffsetById)
          if(parentIsRoot && mindmap.children.length > 3) {
            let half = Math.trunc(parent.children.length / 2)
            children = [children[0].slice(0, half), children[0].slice(half)];
            childrenOffset = [childrenOffset[0].slice(0, half), childrenOffset[0].slice(half)]
          } 
          childrenOffsetLeft = childrenOffset.map(offsets => Math.min(...offsets.map(offset => offset.left)))
          childrenOffsetRight = childrenOffset.map(offsets => Math.min(...offsets.map(offset => offset.right)))
          // 结构 [[t1,b1,t2,b2], [t3,b3,t4,b4]]
          childrenOffsetTop = childrenOffset.map(each => each.map(offset => [offset.top, offset.bottom]).reduce((flat_arr, cur) => flat_arr.concat(cur), []))
        }
      }
    },
    {
      // 拖动目标元素时触发drag事件
      type: 'drag',
      handler: (ev: DragEvent) => {
        // 绘制drag图示
        const ctx = dragCanvas.getContext('2d')
        ctx.clearRect(0, 0, dragCanvas.width, dragCanvas.height)
        // 分左右节点
        const total = children.length
        // drag是百分比
        const moveX = -(containerWidth * drag.x / 100)
        const moveY = -(containerHeight * drag.y / 100)
        const mouseX = (ev.clientX + containerLeft) / zoom + moveX
        const mouseY = (ev.clientY + containerTop) / zoom + moveY
        // 遍历所有节点
        for(let i=0; i < total; i++) {
          // inDropArea 是将target为dropArea的子节点, 这里判断插入为兄弟节点的逻辑
          if(!inDropArea && mouseX > childrenOffsetLeft[i] && mouseX < childrenOffsetRight[i]) {
            let childOffset: Position = {}
           childOffset.left =  childrenOffsetLeft[i]; 
           childOffset.right = childrenOffsetRight[i];
            const childLeftOfParent = i === 1 || (!parentIsRoot && (document.getElementById(nodeId as string).dataset.tag === NodeType.LEFT_NODE))
            const lastIndex = childrenOffsetTop[i].length - 1;
            // 拖拽到单侧的第一个元素前面
            if(mouseY > childrenOffsetTop[i][0] - 200 && mouseY < childrenOffsetTop[i][0]) {
              childOffset.top = childrenOffsetTop[i][0] - 50
              childOffset.bottom = childrenOffsetTop[i][0]
              // 绘制拖拽元素
              drawDragCanvas(ctx, theme, nodeId, parentOffset, childOffset, childLeftOfParent)
              targetId = children[i][0]
              isSibling = true;
              return
            }

            for(let j = 2; j < lastIndex + 1; j += 2) {
              if(mouseY > childrenOffsetTop[i][j-1] && mouseY < childrenOffsetTop[i][j]) {
                childOffset.top = childrenOffsetTop[i][j-1]
                childOffset.bottom = childrenOffsetTop[i][j]
                drawDragCanvas(ctx, theme, nodeId, parentOffset, childOffset, childLeftOfParent)
                targetId = children[i][j/2]
                isSibling = true
                return
              }
            }

             // 拖拽到右侧的最后一个元素后面
            if(mouseY > childrenOffsetTop[i][lastIndex] && mouseY < childrenOffsetTop[i][lastIndex] + 200){
              childOffset.top = childrenOffsetTop[i][lastIndex]
              childOffset.bottom = childrenOffsetTop[i][lastIndex] + 50
              // 绘制拖拽元素
              drawDragCanvas(ctx, theme, nodeId, parentOffset, childOffset, childLeftOfParent)
              targetId = children[i+1] && children[i+1][0]
              isSibling = true;
              return
            }
          
          }
        }
      }
    },
    {
      // 阻止默认动作以启用drop
      type: 'dragover',
      handler: (ev: DragEvent) => {
        ev.preventDefault()
      }
    },
    {
      // 当可拖动的元素进入可放置的目标时高亮目标节点
      type: 'dragenter',
      handler: (ev) => {
        if(ev.target && ((ev.target) as HTMLDivElement).dataset.tag === NodeType.DROP_AREA) {
          (<HTMLElement>ev.target).parentElement.classList.add('ondrag');
          targetId = (<HTMLElement>ev.target).parentElement.id;
          isSibling = false;
          inDropArea = true
        }
      }
    },
    {
      // 当拖动元素离开可放置目标节点
      type: 'dragleave',
      handler: (ev: DragEvent) => {
        if(ev.target && ((ev.target) as HTMLDivElement).dataset.tag === NodeType.DROP_AREA) {
          (<HTMLElement>ev.target).parentElement.classList.remove('ondrag');
          targetId = ''
          isSibling = false;
          inDropArea = false
        }
      }
    },
    {
      // 阻止默认动作, 放入drop_area
      type: 'drop',
      handler: (ev: DragEvent):void => {
        console.log('run this')
        ev.stopPropagation();
        ev.preventDefault();
        (<HTMLElement>ev.target).parentElement.classList.remove('ondrag');
        if(targetId !== '' && targetId !== nodeId && targetId !== parentId) {
          moveNode({nodeId, targetId, parentId, isSibling})
        }
      }
    },
    {
      // 释放拖拽
      type: 'dragend',
      handler: (ev: DragEvent) => {
        const ctx = dragCanvas.getContext('2d')
        ctx.clearRect(0, 0, dragCanvas.width, dragCanvas.height)
        containerEl.removeEventListener('scroll', handleContainerScroll)
      }
    }
  ]
}