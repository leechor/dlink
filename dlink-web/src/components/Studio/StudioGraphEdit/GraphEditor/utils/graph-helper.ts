import { isGroupProcess } from './graph-tools-func';
import { Cell, Graph, Node } from '@antv/x6';
import {
  PreNodeInfo,
} from '@/components/Studio/StudioGraphEdit/GraphEditor/utils/cons';

export function getGraphViewSize() {
  const view = document.querySelector('.x6-graph-scroller-pannable');
  if (!view) {
    return;
  }
  const size = view.getBoundingClientRect();
  return size;
}

export const convertAbsoluteToRelativePosition = (
  source: { x: number; y: number },
  target: Node,
) => {
  return {
    x: source.x - target.position().x,
    y: source.y - target.position().y,
  };
};

export interface PreNodeRect {
  x: number;
  y: number;
  height: number;
  width: number;
}

export const getPointsBox = (points: PreNodeRect[]): PreNodeRect => {
  let left: number,
    top: number,
    right: number,
    bottom: number,
    width: number = 0,
    height: number = 0;
  points.forEach((point) => {
    if (!point) {
      return;
    }
    if (left === undefined || point.x < left) {
      left = point.x;
    }
    if (top === undefined || point.y < top) {
      top = point.y;
    }
    if (right === undefined || point.x + point.width > right) {
      right = point.x + point.width;
    }
    if (bottom === undefined || point.y + point.height > bottom) {
      bottom = point.y + point.height;
    }
    width = right - left;
    height = bottom - top;
  });
  return { x: left!, y: top!, width, height };
};

export function shrinkGroupNode(graph: Graph, groupNode: Node) {
  const children = groupNode.getChildren() ?? [];

  //移动组节点位置
  const preGroupNodeRect = groupNode.prop(PreNodeInfo.PREVIOUS_NODE_RECT);
  groupNode.size(preGroupNodeRect.width, preGroupNodeRect.height);
  groupNode.setPosition(preGroupNodeRect.x, preGroupNodeRect.y, { deep: true, relative: true });
  graph?.centerCell(groupNode);

  groupNode.prop(PreNodeInfo.PREVIOUS_NODE_RECT, {
    ...groupNode.position({ relative: true }),
    ...groupNode.size(),
  });

  children.forEach((cell: Cell) => {
    if (cell.isNode()) {
      cell.prop(PreNodeInfo.PREVIOUS_NODE_RECT, {
        ...cell.position({ relative: true }),
        ...cell.size(),
      });
      cell.setPosition(groupNode.position());

      if (isGroupProcess(cell)) {
        cell.setAttrs({ fo: { visibility: 'hidden' } });
      }
    }
    cell.hide();
  });
}
