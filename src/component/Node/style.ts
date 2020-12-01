import { css } from "@emotion/css";
import { Theme } from "../../types/constant";

const style_selected_border = `
  box-shadow: 0 0 0 3px #fff, 0 0 0 6px var(${Theme.THEME_EX});
`;

export const common_style = css`
  position: relative;
  min-width: 10px;
  max-width: 200px;
  margin: 20px 40px;
  padding: 15px;
  background-color: #fff;
  border: 1px solid var(${Theme.THEME_MAIN});
  border-radius: 10px;
  cursor: pointer;
  p {
    min-height: 18px;
    margin: 0;
    line-height: 1.5em;
    overflow-wrap: break-word;
    text-align: center;
  }
  &:hover {
    ${style_selected_border};
  }

  &.ondrag {
    background-color: var(${Theme.THEME_EX});
    p {
      color: #fff;
    }
  }
`;
export const specific_style = [
  css`
    div& {
      padding: 15px 20px;
      color: #fff;
      font-size: 120%;
      font-weight: 700;
      background-color: var(${Theme.THEME_DARK});
      border: 2px solid var(${Theme.THEME_EX});
    }
  `,
  css`
    div& {
      background-color: var(${Theme.THEME_LIGHT});
    }
  `,
  css`
    div& {
      padding: 10px 15px;
    }
  `,
  css`
    div& {
      padding: 0px 15px;
      border: 2px solid var(${Theme.THEME_EX});
      p {
        font-size: 90%;
      }
    }
  `
];
export const selected_style = css`
  z-index: 1;
  ${style_selected_border};
`;

export const drop_area = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const toggle_button = css`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 20px;
  height: 20px;
  margin: auto 0;
  padding: 0;
  text-align: center;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  outline: none;
`;
export const button_left = css`
  left: -15px;
`;
export const button_right = css`
  right: -15px;
`;
