import * as React from "react";
import ThemeProvider from "./container/ThemeProvider";
import Nav from "./container/Nav";
import Main from "./container/Main";
import "./styles.css";

export default function App() {
  return (
    <ThemeProvider>
      <Nav />
      <Main />
    </ThemeProvider>
  );
}
