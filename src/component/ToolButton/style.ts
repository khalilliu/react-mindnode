import { css } from "@emotion/css";
import { Theme } from "../../types/constant";

export const wrapper = css`
  margin: 0 0.12em;
  padding: 0em 0.36em;
  background-color: transparent;
  border: none;
  outline: none;
  height: 100%;
  cursor: pointer;
  i {
    display: block;
    margin-bottom: 0.12em;
    font-size: 100%;
  }
  span {
    display: block;
    font-size: 25%;
    transform-origin: center center;
  }
  &:active > span {
    transform: scale(0.95);
  }
  &:hover {
    background-color: #f3f3f3;
    color: var(${Theme.THEME_ASSIST});
  }
`;

export const disabled_style = css`
  &,
  &:hover {
    color: #ccc;
  }
  cursor: not-allowed;
`;
