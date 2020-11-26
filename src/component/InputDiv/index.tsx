import { useConcent } from "concent";
import React, { FC, PropsWithChildren, useEffect, useRef } from "react";
import { INodeId } from "../../types/mindmap";
import { handlePropagation } from "../../utils/helpers";
import { wrapper } from "./style";

type IProps = PropsWithChildren<{
  nodeId: INodeId;
}>;

const InputDiv: FC<IProps> = ({ nodeId, children }) => {
  const { cr } = useConcent({ connect: ["mindmap", "nodeStatus"] });
  const self = useRef<HTMLDivElement>();
  const handleKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>): void => {
    switch (ev.key.toUpperCase()) {
      case "ESCAPE":
        self.current.textContent = children as string;
        break;
      case "ENTER":
        self.current.blur();
        break;
      default:
        break;
    }
  };
  const handleBlur = (): void => {
    cr.mindmap.changeText({ nodeId, text: self.current.textContent });
    cr.nodeStatus.setSelect({ nodeId });
  };

  useEffect(() => {
    // 聚焦并且选中input中所有的元素
    self.current.focus();
    const selection = document.getSelection();
    selection.selectAllChildren(self.current);
  }, []);

  return (
    <div
      className={wrapper}
      ref={self}
      contentEditable="true"
      onClick={handlePropagation}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      suppressContentEditableWarning
    >
      {children}
    </div>
  );
};

export default InputDiv;
