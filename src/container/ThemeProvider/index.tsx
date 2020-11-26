import React from "react";
import { css } from "@emotion/css";
import { useTheme } from "../../hooks/useTheme";
import { Theme } from "../../types/constant";

const ThemeProvider = ({ children }) => {
  const { theme } = useTheme();
  return (
    <div
      className={css`
        ${Theme.THEME_MAIN}: ${theme.main};
        ${Theme.THEME_LIGHT}: ${theme.light};
        ${Theme.THEME_ASSIST}: ${theme.assist};
        ${Theme.THEME_DARK}: ${theme.dark};
        ${Theme.THEME_EX}: ${theme.ex};
      `}
    >
      {children}
    </div>
  );
};

export default ThemeProvider;
