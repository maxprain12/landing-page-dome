export type GradientOrigin =
  | "bottom-middle"
  | "bottom-left"
  | "bottom-right"
  | "top-middle"
  | "top-left"
  | "top-right"
  | "left-middle"
  | "right-middle"
  | "center";

export function originPosition(origin: GradientOrigin): string {
  switch (origin) {
    case "bottom-middle":
      return "50% 100%";
    case "bottom-left":
      return "0% 100%";
    case "bottom-right":
      return "100% 100%";
    case "top-middle":
      return "50% 0%";
    case "top-left":
      return "0% 0%";
    case "top-right":
      return "100% 0%";
    case "left-middle":
      return "0% 50%";
    case "right-middle":
      return "100% 50%";
    case "center":
      return "50% 50%";
    default: {
      const _exhaustive: never = origin;
      return _exhaustive;
    }
  }
}
