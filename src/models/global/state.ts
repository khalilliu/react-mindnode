import { NodeText } from "../../types/constant";
import { IGlobal } from "../../types/global";

const defaultGlobal: IGlobal = {
  title: localStorage.getItem("title") || NodeText.DEFAULT_TITLE,
  theme_index: Number(localStorage.getItem("theme_index")) || 0,
  theme_list: [
    {
      main: "#eda938",
      light: "#f4cc87",
      dark: "#e79021",
      ex: "#ce7529",
      assist: "#1980da"
    },
    {
      main: "#ff4c26",
      light: "#ffcabc",
      dark: "#e83f1d",
      ex: "#c12a0f",
      assist: "#0e95ac"
    },
    {
      main: "#50b843",
      light: "#c3e5bd",
      dark: "#28ab17",
      ex: "#038b00",
      assist: "#790595"
    },
    {
      main: "#2d99d7",
      light: "#e2f5ff",
      dark: "#2786c3",
      ex: "#2375af",
      assist: "#ca6c27"
    },
    {
      main: "#b347d2",
      light: "#e4c0ef",
      dark: "#a623c9",
      ex: "#9621c3",
      assist: "#009000"
    },
    {
      main: "#555555",
      light: "#e9e9e9",
      dark: "#434343",
      ex: "#262626",
      assist: "#860314"
    }
  ],
  zoom: 1,
  x: 0,
  y: 0
};

export function getInitialState() {
  return defaultGlobal;
}

export default getInitialState();
