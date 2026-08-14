import classNames from 'classnames';
import DeleteIcon from '../assets/icons/delete.svg?react';
import EditIcon from '../assets/icons/edit.svg?react';
import { CircularProgressBar } from '../CircularProgressBar/CircularProgressBar';
import './style.scss';

type Status = "todo" | "progress" | "done"
type Priority = "low" | "medium" | "high"

const statusMap: Record<Status, string>={
  todo: "Новая",
  progress: "В процессе",
  done: "Сделано"
}

const priorityMap: Record<Priority, string>={
  low: "Низкий",
  medium: "Средний",
  high: "Высокий"
}


export const TaskCard = ({
  task: { id, title, priority, status, progress },
  onDelete,
  onEdit
}) => {
  return (
    <div className="task-card">
      <div className="flex w-100">
        <span className="task-title">Задача</span>
        <span className="task">{title}</span>
      </div>
      <div className="flex">
        <span className="priority-title">Приоритет</span>
        <span className={classNames(`priority--${priority}`, 'priority')}>
          {priorityMap[priority] || priority}
        </span>
      </div>
      <div className="task-status-wrapper">
        <button className={classNames(`status--${status}`, 'status')}>
          {statusMap[status] || status}
        </button>
      </div>
      <div className="progress">
        <CircularProgressBar
          strokeWidth={2}
          sqSize={24}
          percentage={progress}
        />
      </div>
      <div className="actions">
        <EditIcon className="mr-20 cp" onClick={onEdit} />
        <DeleteIcon className="cp" onClick={onDelete} />
      </div>
    </div>
  );
};
