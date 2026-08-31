import classNames from 'classnames';
import DeleteIcon from '../../../../shared/assets/icons/delete.svg?react';
import EditIcon from '../../../../shared/assets/icons/edit.svg?react';
import { CircularProgressBar } from '../../../../shared/UI/CircularProgressBar/CircularProgressBar.tsx';
import './style.scss';
import { EPriority, EStatus } from "../../models/enum.ts";

const statusMap: Record<EStatus, string> = { // можно вынести в отдельный файл constants.ts
    todo: "Новая",
    progress: "В процессе",
    done: "Сделано"
}

const priorityMap: Record<EPriority, string> = { // можно вынести в отдельный файл constants.ts
    low: "Низкий",
    medium: "Средний",
    high: "Высокий"
}

// Типизировать пропсы

export const TaskCard = ({
                             task: { title, priority, status, progress },
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
                <EditIcon className="mr-20 cp" onClick={onEdit}/>
                <DeleteIcon className="cp" onClick={onDelete}/>
            </div>
        </div>
    );
};
