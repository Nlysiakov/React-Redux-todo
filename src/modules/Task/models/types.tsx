import { EPriority, EStatus } from "./enum.ts";

export type TTask = {
    id: string;
    title: string;
    priority: EPriority;
    status: EStatus;
    progress: number;
}

export type TAddEditTaskModalProps = {
    onClose: () => void;
    initialData?: TTask | null;
    onSubmit: (taskData: Omit<TTask, "id" | "progress"> & { id?: number }) => void; // разделить на тип для функции создания таски и редактирования
};

export type TDeleteModalProps = {
    onClose: () => void;
    taskTitle?: string;
    onDelete: () => void
}
