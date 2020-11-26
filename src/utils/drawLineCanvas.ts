import { INode } from "../types/mindmap";
import { ITheme } from "../types/global";
import { NodeDomMap } from "../types/comp";
import { NodeType } from "../types/constant";

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
