import { EPriority, EStatus } from "./enum.ts";

export type TTask = {
    id: number;
    title: string;
    priority: EPriority;
    status: EStatus;
    progress: number;
}


