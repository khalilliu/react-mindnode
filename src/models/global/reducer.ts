import { stepConst } from "../../types/constant";
import { RootState, AC } from "../../types/store";
import { deepCopy } from "../../utils/helpers";

type GlobalState = RootState["$$global"];
type IAC = AC<"$$global">;

export function changeTheme(payload, moduleState: GlobalState, ac: IAC): GlobalState {
  const newState = deepCopy(moduleState);
  newState.theme_index = payload.theme_index;
  return newState;
}

export function changeTitle(payload, moduleState: GlobalState, ac: IAC): GlobalState {
  console.log("run this");
  const newState = deepCopy(moduleState);
  newState.title = payload.title;
  return newState;
}

export function zoomIn(payload, moduleState: GlobalState, ac: IAC): GlobalState {
  const newState = deepCopy(moduleState);
  newState.zoom += stepConst.ZOOM_STEP;
  return newState;
}

export function zoomOut(payload, moduleState: GlobalState, ac: IAC): GlobalState {
  const newState = deepCopy(moduleState);
  newState.zoom -= stepConst.ZOOM_STEP;
  newState.zoom = Math.max(0.3, newState.zoom);
  return newState;
}

export function zoomReset(payload, moduleState: GlobalState, ac: IAC): GlobalState {
  const newState = deepCopy(moduleState);
  newState.zoom = 1;
  return newState;
}


export function moveXY(payload: {x:number, y: number}, moduleState: GlobalState, ac: IAC) : GlobalState {
  const newState = deepCopy(moduleState);
  newState.x += payload.x / newState.zoom
  newState.y += payload.y / newState.zoom
  return newState
}