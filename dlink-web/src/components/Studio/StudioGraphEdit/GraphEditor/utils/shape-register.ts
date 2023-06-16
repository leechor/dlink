import { handleInitNodes } from '@/components/Studio/StudioGraphEdit/GraphEditor/utils/node-by-data-loader';
import { Graph, Node } from '@antv/x6';
import { register } from '@antv/x6-react-shape';
import TextNode from '@/components/Studio/StudioGraphEdit/GraphEditor/components/text-node';
import OperatorNode from '@/components/Studio/StudioGraphEdit/GraphEditor/components/operator-node';
import SqlNode from '@/components/Studio/StudioGraphEdit/GraphEditor/components/sql-node';
import { Parameter } from '@/components/Studio/StudioGraphEdit/GraphEditor/ts-define/parameter';
import { PortManager } from '@antv/x6/es/model/port';
import React from 'react';
import { GroupNode } from '@/components/Studio/StudioGraphEdit/GraphEditor/components/group-node';
import unRegisterShape from "./shape-unregister"

enum LocalNodeType {
  MYSQL = 'mysql',
  OPERATORS = 'operators',
}

function registerTextNode() {
  //注册文本节点
  register({
    shape: 'custom-text-node',
    component: TextNode,
    width: 180,
    height: 180,
    attrs: {
      text: {
        text: 'custom-text-node',
      },
    },
    zIndex: 20,
  });
}

function registerOperatorNode(
  name: string,
  ports: Partial<PortManager.Metadata> | PortManager.PortMetadata[],
  registerCpn: React.ComponentType<{
    node: Node;
    graph: Graph;
  }>,
  portItem: PortManager.PortMetadata[],
) {
  register({
    width: 80,
    height: 50,
    attrs: {
      body: {
        style: {
          'background-color': '#c6e5ff',
          border: '1px solid #949494',
          "border-radius": "2px"
        },
      },
    },
    shape: name,
    component: registerCpn,
    ports: { ...ports, items: portItem },
  });
}

export default (
  graph: Graph,
  ports: Partial<PortManager.Metadata> | PortManager.PortMetadata[],
  operatorParameters: Parameter[],
) => {

  //取消已注册，重新注册
  unRegisterShape(operatorParameters)
  operatorParameters?.forEach((param) => {
    //生成ports Item
    const portItem: PortManager.PortMetadata[] = [];

    portItem.push(
      ...param.ports.inputs.map((item: { id: string }) => ({
        group: 'inputs',
        id: item.id,
        zIndex: 999,
        attrs: {
          text: {
            text: `${item.id}`,
            style: {
              visibility: "hidden",
              fontSize: 10,
              fill: "#3B4351",
            },
          },
        },
        label: {
          position: "bottom",
        }
      })),
    );

    portItem.push(
      ...param.ports.outputs.map((item: { id: string }) => ({
        group: 'outputs',
        zIndex:999,
        id: item.id,
        attrs: {
          text: {
            text: `${item.id}`,
            style: {
              visibility: "hidden",
              fontSize: 10,
              fill: "#3B4351",
            },
          },
        },
        label: {
          position: "bottom",
        }
      })),
    );

    //保存组和节点关系
    switch (param.group.split('.')[0]) {
      case LocalNodeType.MYSQL:
        registerOperatorNode(param.name, ports, SqlNode, portItem);
        break;
      case LocalNodeType.OPERATORS:
        registerOperatorNode(param.name, ports, OperatorNode, portItem);
        break;
      default:
        break;
    }
  });
  registerTextNode();
  Graph.registerNode('package', GroupNode);


};
