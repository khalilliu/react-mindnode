import { useConcent } from "concent";
import { SnapShot } from "../types/history";

export default () => {
  const {
    cr,
    connectedState: { history }
  } = useConcent({ connect: ["mindmap", "nodeStatus", "history"] });
  const applySnapshot = (snapShot: SnapShot) => {
    if (snapShot) {
      const { mindmap, currentNode } = snapShot;
      cr.mindmap.setMindmap({ mindmap: JSON.parse(mindmap) });
      cr.nodeStatus.setSelect({ nodeId: currentNode });
    }
  };
  return {
    // 撤销
    undoHistory: () => {
      applySnapshot(history.undo[history.undo.length - 1]);
    },
    // 重做
    redoHistory: () => {
      applySnapshot(history.redo[0]);
    }
  };
};
