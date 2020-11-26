import React, { useRef } from "react";
import Mindmap from "../Mindmap";
import { wrapper } from "./style";
import * as constant from "../../types/constant";

const Main: React.FC = () => {
  const self = useRef<HTMLElement>();
  return (
    <main ref={self} className={wrapper} id={constant.MINDMAP_MAIN}>
      <Mindmap container_ref={self} />
    </main>
  );
};

export default Main;
