import classNames from 'classnames';
import DeleteIcon from '../../../../shared/assets/icons/delete.svg?react';
import EditIcon from '../../../../shared/assets/icons/edit.svg?react';
import { CircularProgressBar } from '../../../../shared/UI/CircularProgressBar/CircularProgressBar.tsx';
import './style.scss';
import { statusMap } from '../../models/constants.ts';
import { priorityMap } from '../../models/constants.ts';
import { TTask } from '../../models/types.tsx';


interface ITaskCardProps{
    task: TTask;
    onDelete: ()=>void;
    onEdit: ()=>void
}

export const TaskCard = ({
    task: { title, priority, status, progress },
    onDelete,
    onEdit
    }: ITaskCardProps) => {
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
