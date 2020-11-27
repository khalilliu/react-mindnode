import { RootState, AC } from "../../types/store";
import { deepCopy } from "../../utils/helpers";

type ModuleState = RootState["editPanel"];
type IAC = AC<"editPanel">;

export const togglePanel = (
  payload: { isShow: boolean },
  moduleState: ModuleState,
  ac: IAC
): ModuleState => {
  moduleState.isShow = payload.isShow;
  return moduleState;
};
