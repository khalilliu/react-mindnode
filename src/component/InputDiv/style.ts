import { css } from "@emotion/css";

export const wrapper = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: fit-content;
  min-width: 1em;
  max-width: 10em;
  height: fit-content;
  margin: auto;
  padding: 10px;
  color: #333;
  background-color: #fff;
  box-shadow: 0 0 20px #aaa;
  border-radius: 5px;
  outline: none;
  z-index: 5;
  user-select: text;
`;
