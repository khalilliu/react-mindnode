import { useConcent } from "concent";

export function useTheme() {
  const setup = (ctx) => {
    ctx.computed("current_theme", (newState, oldState, fnCtx) => {
      return newState.theme_list[newState.theme_index];
    });
  };
  const { refComputed } = useConcent({ module: "$$global", setup });
  return { theme: refComputed.current_theme };
}
