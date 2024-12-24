import colors from "tailwindcss/colors";

export type ColorKey = keyof typeof colors;

export type ExcludedColors =
  | "inherit"
  | "current"
  | "transparent"
  | "black"
  | "white";

export type ColorTonality = keyof (typeof colors)["amber"];

export type BgColorType =
  | `bg-${Exclude<ColorKey, ExcludedColors>}-${ColorTonality}`
  | `bg-${ExcludedColors}`;
export type BgTextColorType =
  | `text-${Exclude<ColorKey, ExcludedColors>}-${ColorTonality}`
  | `text-${ExcludedColors}`;
