import {Graph,Node } from "@antv/x6";

export type DispatchMenuInfo = React.Dispatch<
  React.SetStateAction<{
    show: boolean;
    top: number;
    left: number;
    node:Node|null
  }>
>;

export function initMenu(graph: Graph, isShowMenuInfo: DispatchMenuInfo) {
  //右键菜单点击node时
  graph.on("node:contextmenu", ({ cell, e }) => {
    
    const p = graph.clientToGraph(e.clientX, e.clientY);
    isShowMenuInfo({
      show: true,
      top: p.y,
      left: p.x,
      node:cell
    });
  });

  //画图区域右键
  graph.on("blank:contextmenu", ({ e }) => {
    const p = graph.clientToGraph(e.clientX, e.clientY);
    isShowMenuInfo({
      show: true,
      top: p.y,
      left: p.x,
      node:null,
    });
  });

  graph.on("blank:click", () => {
    isShowMenuInfo({
      show: false,
      top: 0,
      left: 0,
      node:null
    });
  });
}
