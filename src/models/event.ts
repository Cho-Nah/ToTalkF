import type { JSX } from "react";

export interface IEvent {
    name: string;
    desc: string;
    time: string;
    contacts: string;
    slots: number;
    selectedSlots: number;
    inQueue?: number | 0;
}

export interface INotify {
    icon: "warning" | "success" | "primary" | "error";
    label: string;
    sublabel?: string;
    window: JSX.Element
}