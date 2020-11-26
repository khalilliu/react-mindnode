import { ROOT_NODE_ID } from "../../types/constant";
import { INode } from "../../types/mindmap";

const defaultState: INode = {
  id: ROOT_NODE_ID,
  text: "主题",
  showChildren: true,
  children: [
    {
      id: "Sub1",
      text: "分支1",
      showChildren: true,
      children: []
    },
    {
      id: "Sub2",
      text: "分支2",
      showChildren: true,
      children: []
    },
    {
      id: "Sub3",
      text: "分支3",
      showChildren: true,
      children: []
    }
  ]
};

export function getInitialState() {
  return defaultState;
}

export default getInitialState();
