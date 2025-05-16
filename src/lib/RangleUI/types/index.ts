export type AnyFunction = () => void;
export type AnyCallback<T> = (value: T) => void;

export type rangleType = "default" | "secondary";
export type rangleTypeExtended = rangleType | "icon" | "transparent";
export type rangleColor = "primary" | "success" | "warning" | "error" | "neutral";