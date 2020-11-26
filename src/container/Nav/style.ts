import { css } from "@emotion/css";

// CSS
export const wrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  padding: 0 30px;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  background-color: #fff;
  font-size: 25px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  z-index: 10;
`;

export const section = css`
  display: flex;
  justify-content: space-between;
  height: 100%;
  &:nth-of-type(2n-1) {
    flex: 1;
  }
  &:nth-of-type(2n) {
    flex-basis: 200px;
    text-align: center;
    justify-content: center;
  }
`;
