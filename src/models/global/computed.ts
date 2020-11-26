import { RootState } from "../../types/store";

type GlobalState = RootState["$$global"];

export function current_theme(n: GlobalState) {
  return n.theme_list[n.theme_index];
}
