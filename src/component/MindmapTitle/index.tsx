import React, { FC, useEffect, useRef, KeyboardEvent } from "react";
import { useConcent } from "concent";
import { wrapper } from "./style";

const MindmapTitle: FC<any> = () => {
  const self = useRef({} as HTMLSpanElement);
  const { state, dispatch } = useConcent("$$global");
  useEffect(() => {
    document.title = `RMind-${state.title}`;
    localStorage.setItem("title", state.title);
  }, [state.title]);

  const handleKeyDown = (ev: KeyboardEvent): void => {
    switch (ev.key.toUpperCase()) {
      case "ESCAPE":
        self.current["textContent"] = state.title;
        break;
      case "ENTER":
        self.current.blur();
        break;
      default:
        break;
    }
  };

  const handleBlur = () => {
    let new_title = self.current.textContent.trim();
    console.log(new_title);
    if (new_title === "") {
      new_title = state.title;
    }
    if (new_title.length > 30) {
      new_title = new_title.slice(0, 30);
    }
    self.current.textContent = new_title;
    dispatch("changeTitle", { title: new_title });
  };

  return (
    <span
      ref={self}
      className={wrapper}
      contentEditable="true"
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      spellCheck="false"
      suppressContentEditableWarning
    >
      {state.title}
    </span>
  );
};

export default MindmapTitle;
