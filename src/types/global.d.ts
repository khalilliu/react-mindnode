export type ITheme = {
  main: string;
  light: string;
  dark: string;
  ex: string;
  assist: string;
};
export type IPosition = {
  zoom: number;
  x: number;
  y: number;
};
export interface IGlobal extends IPosition {
  title: string;
  theme_index: number;
  theme_list: ITheme[];
}
