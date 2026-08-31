

export type TTask={
  id: number;
  title: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "progress" | "done";
  progress: number;
}

export type TAddEditTaskModalProps = {
  onClose: () => void;
  initialData?: TTask | null;
  onSubmit: (taskData: Omit<TTask, "id" | "progress"> & { id?: number }) => void;
};

export type TDeleteModalProps = {
  onClose: ()=> void;
  taskTitle?: string;
  onDelete: ()=> void
}