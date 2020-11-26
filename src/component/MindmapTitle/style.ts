import { css } from "@emotion/css";
import { Theme } from "../../types/constant";

export const wrapper = css`
  align-self: center;
  padding: 5px 20px;
  color: var(${Theme.THEME_DARK});
  font-size: 20px;
  font-weight: 700;
  border-bottom: 2px solid transparent;
  outline: none;
  transition: 200ms;
  border-radius: 5px;

  &:read-write {
    cursor: edit;
  }
  &:hover {
    background-color: #f3f3f3;
  }
  &:focus {
    /* background-color: #f2f2f2; */
    border-radius: 0px;
    border-bottom: 2px solid var(${Theme.THEME_ASSIST});
  }
`;
