import { RootState, AC } from "../../types/store";
import { deepCopy } from "../../utils/helpers";

type ModuleState = RootState["editPanel"];
type IAC = AC<"editPanel">;

export const togglePanel = (
  payload: { isShow: boolean },
  moduleState: ModuleState,
  ac: IAC
): ModuleState => {
  let newState = deepCopy(moduleState);
  newState.isShow = payload.isShow;
  return newState;
};
