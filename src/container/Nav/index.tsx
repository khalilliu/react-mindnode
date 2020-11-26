import React, { FC } from "react";
import {
  Add,
  PreviewOpen,
  DownloadOne,
  Save,
  Theme,
  ZoomIn,
  ZoomOut,
  Search,
  Refresh,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Undo,
  Redo,
  FullScreenOne
} from "@icon-park/react";
import MindmapTitle from "../../component/MindmapTitle";
import ToolButton from "../../component/ToolButton";
import { wrapper, section } from "./style";

const Nav: FC = () => {
  return (
    <nav className={wrapper}>
      <section className={section}>
        <ToolButton text="新建" icon={<Add />} />
        <ToolButton text="打开" icon={<PreviewOpen />} />
        <ToolButton text="下载" icon={<DownloadOne />} />
        <ToolButton text="导出" icon={<Save />} />
        <ToolButton text="主题" icon={<Theme />} />
        <ToolButton text="放大" icon={<ZoomIn />} />
        <ToolButton text="缩小" icon={<ZoomOut />} />
        <ToolButton text="还原" icon={<Search />} />
      </section>
      <section className={section}>
        <MindmapTitle />
      </section>
      <section className={section}>
        <ToolButton text="还原" icon={<Refresh />} />
        <ToolButton text="左" icon={<ArrowLeft />} />
        <ToolButton text="上" icon={<ArrowUp />} />
        <ToolButton text="下" icon={<ArrowDown />} />
        <ToolButton text="右" icon={<ArrowRight />} />
        <ToolButton text="撤销" icon={<Undo />} />
        <ToolButton text="重做" icon={<Redo />} />
        <ToolButton text="展开" icon={<FullScreenOne />} />
      </section>
    </nav>
  );
};

export default Nav;
