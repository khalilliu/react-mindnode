import { ROOT_PARENT } from "../types/constant";
import { INodeStatus } from "../types/nodeStatus";

export default function getKeydownEvent(cr, nodeStatus: INodeStatus) {
  const handleKeyEvent = (ev: KeyboardEvent): void => {
    switch (ev.key.toUpperCase()) {
      case "TAB": {
        cr.mindmap.addChild({ nodeId: nodeStatus.cur_select });
        break;
      }
      case "ENTER": {
        ev.preventDefault();
        cr.mindmap.addSibling({
          parentId: nodeStatus.cur_node_info.parent.id,
          nodeId: nodeStatus.cur_select
        });
        break;
      }
      case "F2": {
        cr.nodeStatus.setEdit({ nodeId: nodeStatus.cur_select });
        break;
      }
      case "BACKSPACE":
      case "DELETE": {
        cr.mindmap.deleteNode({
          parentId: nodeStatus.cur_node_info.parent.id,
          nodeId: nodeStatus.cur_select
        });
        break;
      }
      case "ARROWLEFT": {
        ev.preventDefault();
        if (nodeStatus.cur_node_info.parent === ROOT_PARENT) {
          if (nodeStatus.cur_node_info.children.length > 3) {
            let nodeId =
              nodeStatus.cur_node_info.children[
                Math.trunc(nodeStatus.cur_node_info.children.length / 2)
              ].id;
            cr.nodeStatus.setSelect({ nodeId });
          }
        } else {
          if (!nodeStatus.cur_node_info.left) {
            cr.nodeStatus.setSelect({
              nodeId: nodeStatus.cur_node_info.parent.id
            });
          } else if (nodeStatus.cur_node_info.children.length > 0) {
            cr.nodeStatus.setSelect({
              nodeId: nodeStatus.cur_node_info.children[0].id
            });
          }
        }
        break;
      }
      case "ARROWRIGHT": {
        ev.preventDefault();
        if (nodeStatus.cur_node_info.left) {
          cr.nodeStatus.setSelect({
            nodeId: nodeStatus.cur_node_info.parent.id
          });
        } else if (nodeStatus.cur_node_info.children.length > 0) {
          cr.nodeStatus.setSelect({
            nodeId: nodeStatus.cur_node_info.children[0].id
          });
        }
        break;
      }
      case "ARROWUP": {
        ev.preventDefault();
        let curIndex = nodeStatus.cur_node_info.parent.children.findIndex(
          (child) => child.id === nodeStatus.cur_node_info.id
        );
        if (curIndex > 0) {
          cr.nodeStatus.setSelect({
            nodeId: nodeStatus.cur_node_info.parent.child[curIndex - 1].id
          });
        }
        break;
      }
      case "ARROWDOWN": {
        ev.preventDefault();
        let curIndex = nodeStatus.cur_node_info.parent.children.findIndex(
          (child) => child.id === nodeStatus.cur_node_info.id
        );
        let lastIndex = nodeStatus.cur_node_info.parent.children.length - 1;
        if (curIndex < lastIndex) {
          cr.nodeStatus.setSelect({
            nodeId: nodeStatus.cur_node_info.parent.child[curIndex + 1].id
          });
        }
        break;
      }
    }
  };

  return (ev: KeyboardEvent) => {
    if (nodeStatus.cur_edit === "") {
      const isMac: boolean = navigator.platform.toUpperCase().startsWith("MAC");
      const combineKey: boolean = isMac ? ev.metaKey : ev.ctrlKey;
      if (combineKey && ev.key.toUpperCase() === "Z") {
        if (ev.shiftKey) {
          // 重做
        } else {
          // 上一步
        }
      }
    }
    if (nodeStatus.cur_edit !== "") {
      try {
        handleKeyEvent(ev);
      } catch (err) {
        alert("当前的节点信息存在问题，请重新选择节点");
      }
    }
  };
}
