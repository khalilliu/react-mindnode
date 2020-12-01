import { INode, INodeId } from "../types/mindmap";
import { ITheme } from "../types/global";
import { NodeDomMap } from "../types/comp";
import { NodeType } from "../types/constant";
import {Position} from './getDragEvents'

// 绘制弧线
function drawBezier(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  ctx.moveTo(x1, y1);
  ctx.bezierCurveTo(x1, y2, 0.9 * x2 + 0.1 * x1, y2, x2, y2);
}

// 绘制连线
function drawLine(
  ctx: CanvasRenderingContext2D,
  node: INode,
  map: NodeDomMap
): void {
  const { id: parentId, children } = node;
  if (children.length > 0) {
    const [parentX_left, parentX_right, parentY] = map.get(parentId);
    children.forEach((item: INode) => {
      const childData = map.get(item.id);
      if (childData) {
        const [childX_left, childX_right, childY, childTag] = childData;
        if (childTag === NodeType.LEFT_NODE) {
          drawBezier(ctx, parentX_left, parentY, childX_right, childY);
        } else {
          drawBezier(ctx, parentX_right, parentY, childX_left, childY);
        }
        // 绘制子节点关系
        drawLine(ctx, item, map);
      }
    });
  }
}

// 绘制节点中间的连线
export default function drawLineCanvas(
  ctx: CanvasRenderingContext2D,
  theme: ITheme,
  mindmap: INode,
  map: NodeDomMap
): void {
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = theme.main;
  drawLine(ctx, mindmap, map);
  ctx.stroke();
  ctx.closePath();
}

// 绘制拖拽的虚拟节点
export function drawDragCanvas(ctx: CanvasRenderingContext2D, theme:ITheme, nodeId:INodeId, parentOffset: undefined|Position, childOffset: Position, childLeftOfParent: boolean):void {
  const virturalRectWidth = 50, virturalRectHeight = 20;
  ctx.beginPath();
  ctx.strokeStyle = theme.main
  ctx.lineWidth = 2
  ctx.setLineDash([5,5])
  let parentX, parentY, childX, childY;
  parentY = (parentOffset.top + parentOffset.bottom)/2
  childY = (childOffset.top + childOffset.bottom)/2
  if(childLeftOfParent) {
    parentX = parentOffset.left
    childX = childOffset.right
    ctx.strokeRect(childX - virturalRectWidth, childY - virturalRectHeight/2, virturalRectWidth, virturalRectHeight)
  } else {
    parentX = parentOffset.right
    childX = childOffset.left
    ctx.strokeRect(childX, childY - virturalRectHeight/2, virturalRectWidth, virturalRectHeight)
  }
  drawBezier(ctx, parentX, parentY, childX, childY)
  ctx.stroke()
  ctx.closePath()
}