import { run } from "concent";
import reduxDevToolPlugin from "concent-plugin-redux-devtool";
import * as models from "./models";

const startupOption = {
  plugins: [reduxDevToolPlugin]
};

run(models, startupOption);
