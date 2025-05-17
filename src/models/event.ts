import type { JSX } from "react";

export interface IEvent {
    name: string
    slots: number
    selectedSlots: number
    tagName: string
    time: number;   //timestamp
    inQueue?: number;
}

export interface INotify {
    icon: "warning" | "success" | "primary" | "error";
    label: string;
    sublabel?: string;
    window: JSX.Element
}