import { NodeText } from "../../types/constant";
import { INode, INodeId } from "../../types/mindmap";
import { RootState, AC } from "../../types/store";
import {
  findNode,
  deepCopy,
  setShowChildrenTrue,
  generateRandom
} from "../../utils/helpers";

type ModuleState = RootState["mindmap"];
type IAC = AC<"mindmap">;

export function changeText(
  payload: { nodeId: INodeId; text: string },
  moduleState: ModuleState,
  ac: IAC
): ModuleState {
  let newMindmap = deepCopy(moduleState);
  let foundNode = findNode(newMindmap, payload.nodeId);
  Object.assign(foundNode, { text: payload.text });
  return newMindmap;
}

export function toggleChildren(
  payload: { nodeId: INodeId },
  moduleState: ModuleState,
  ac: IAC
): ModuleState {
  let newMindmap = deepCopy(moduleState);
  let foundNode = findNode(newMindmap, payload.nodeId);
  if (foundNode.children.length > 0 && foundNode !== newMindmap) {
    Object.assign(foundNode, { showChildren: !foundNode.showChildren });
  }
  return newMindmap;
}

export function addChild(
  payload: { nodeId: INodeId },
  moduleState: ModuleState,
  ac: IAC
) {
  let foundNode = findNode(moduleState, payload.nodeId);
  foundNode.children.push({
    id: generateRandom(),
    text: NodeText.NEW_NODE_TEXT,
    showChildren: true,
    children: []
  })
  return moduleState
}

export function addSibling(
  payload: { parentId?: INodeId; nodeId: INodeId },
  moduleState: ModuleState,
  ac: IAC
) {
  if (payload.parentId) {
    let foundNode = findNode(moduleState, payload.parentId);
    let insertIndex =
      foundNode.children.findIndex((node) => node.id === payload.nodeId) + 1;
    foundNode.children.splice(insertIndex, 0, {
      id: generateRandom(),
      text: NodeText.NEW_NODE_TEXT,
      showChildren: true,
      children: []
    });
  }
}

export function moveNode(
  payload: {
    parentId?: INodeId;
    nodeId: INodeId;
    targetId: INodeId;
    isSibling: boolean;
  },
  moduleState: ModuleState,
  ac: IAC
) {
  let parentNode = findNode(moduleState, payload.parentId);
  let nodeIndex = parentNode.children.findIndex(
    (node) => node.id === payload.nodeId
  );
  let nodeCopy = parentNode.children[nodeIndex];
  parentNode.children.splice(nodeIndex, 1); // delete old node
  if (payload.isSibling) {
    // 插入
    let targetIndex =
      parentNode.children.findIndex((node) => node.id === payload.targetId) +
        1 || parentNode.children.length + 1;
    parentNode.children.splice(targetIndex - 1, 0, nodeCopy);
  } else {
    // 移入子节点
    let targetNode = findNode(moduleState, payload.targetId);
    targetNode.children.push(nodeCopy);
  }
}

export function deleteNode(
  payload: { parentId?: INodeId; nodeId: INodeId },
  moduleState: ModuleState,
  ac: IAC
){
  if (payload.parentId) {
    let foundNode = findNode(moduleState, payload.parentId);
    let deleteIndex = foundNode.children.findIndex(
      (node) => node.id === payload.nodeId
    );
    foundNode.children.splice(deleteIndex, 1);
  }
}

export function expandAll(
  payload: { nodeId: INodeId },
  moduleState: ModuleState,
  ac: IAC
) {
  let foundNode = findNode(moduleState, payload.nodeId);
  setShowChildrenTrue(foundNode);
}

export function setMindmap(
  payload: { mindmap: INode },
  moduleState: ModuleState,
  ac: IAC
) {
  return payload.mindmap;
}
