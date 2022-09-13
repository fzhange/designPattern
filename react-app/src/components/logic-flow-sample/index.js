import { useRef, useEffect } from "react";
import LogicFlow from '@logicflow/core'
import "@logicflow/core/dist/style/index.css";
import React from "react";
import "./index.css"
import box from "./boxx"

import { RectNode, RectNodeModel,h } from "@logicflow/core";

class UserTaskModel extends RectNodeModel {
  initNodeData(data) {
    super.initNodeData(data);
    this.width = 200;
    this.height = 80;
    this.radius = 50;
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.stroke = 'blue';
    style.strokeDasharray = '3 3';
    return style;
  }
}

class UserTaskView extends RectNode {
   getLabelShape() {
    const { model } = this.props;
    const { x, y, width, height } = model;
    const style = model.getNodeStyle();
    return h(
      "svg",
      {
        x: x - width / 2 + 5,
        y: y - height / 2 + 5,
        width: 25,
        height: 25,
        viewBox: "0 0 1274 1024"
      },
      h("path", {
        fill: style.stroke,
        d:
          "M655.807326 287.35973m-223.989415 0a218.879 218.879 0 1 0 447.978829 0 218.879 218.879 0 1 0-447.978829 0ZM1039.955839 895.482975c-0.490184-212.177424-172.287821-384.030443-384.148513-384.030443-211.862739 0-383.660376 171.85302-384.15056 384.030443L1039.955839 895.482975z"
      })
    );
  }
  /**
   * 完全自定义节点外观方法
   */
  getShape() {
    const { model, graphModel } = this.props;
    const { x, y, width, height, radius } = model;
    const style = model.getNodeStyle();
    return h("g", {}, [
      h("rect", {
        ...style,
        x: x - width / 2,
        y: y - height / 2,
        rx: radius,
        ry: radius,
        width,
        height
      }),
      this.getLabelShape()
    ]);
  }
}

export const UserTaskNode =  {
  type: "UserTask",
  view: UserTaskView,
  model: UserTaskModel
};

export default function App() {
  const container = useRef(null);
  useEffect(() => {
    if (!container.current) return;

    const lf = new LogicFlow({
      container: container.current,
      grid: true,
      snapline:false,
      adjustNodePosition: false,
      partial: true, //是否开启局部渲染功能
      background: {
        background: 'transparent', // 'linear-gradient(70.84deg, #F2F7F8 27.86%, #EAF0F8 98.48%)',
      },
      style:{
        baseNode: {
          fill: 'rgb(255, 230, 204)',
          stroke: 'green',
          strokeWidth: 2,
        },
        rect: {
          // fill: 'red',
          radius: '30px',
        },
      }
    });

    lf.register(box);
    lf.render({
      nodes: [
        {
          id: 11,
          type: 'boxx',
          x: 350,
          y: 100,
          properties: {
            name: 'turbo',
            body: 'hello'
          }
        },
      ]
    });
    lf.on('node:click', ({ data}) => {
      lf.setProperties(data.id, {
        name: 'turbo',
        body: Math.random()
      })
    });


  }, [container])

  return (
    <div className="logic-flow-con" ref={container}>
    </div>
  );
}


