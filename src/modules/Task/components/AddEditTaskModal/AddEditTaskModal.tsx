import classNames from 'classnames';
import Close from '../../../../shared/assets/icons/close.svg?react';
import { Button } from '../../../../shared/UI/Button/Button.tsx';
import { Input } from '../../../../shared/UI/Input/Input.tsx';
import { Modal } from '../../../../shared/UI/Modal/Modal.tsx';
import './style.scss';
import { FC, FormEvent, useState } from 'react';
import { TAddEditTaskModalProps } from '../../models/types.tsx';


const priorityMap = {
    high: "Высокий",
    medium: "Средний",
    low: "Низкий"
}

export const AddEditTaskModal: FC<TAddEditTaskModalProps> = ({
        onClose,
        initialData,
        onSubmit
        }) => {

    const isEditing = !!initialData

    const [title, setTitle] = useState(initialData?.title || "")
    const [priority, setPriority] = useState(initialData?.priority || "medium")
    const [status] = useState(initialData?.status || "todo")

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let taskData: any = {
            title,
            priority,
            status,
        }
            if(initialData){
                taskData.id=initialData.id
            }
            onSubmit(taskData)
    }
    // спорное решение

    return (
        <Modal onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="add-edit-modal">
                    <div className="flx-between">
                        <span className="modal-title">{initialData ? "Редактировать задачу" : "Добавить задачу"}</span>
                        <Close className="cp" onClick={onClose}/>
                    </div>
                    <Input
                        label="Задача"
                        placeholder="Введите текст.."
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                        name="title"
                        value={title}
                    />
                    <div className="modal-priority">
                        <span>Приоритет</span>
                        <ul className="priority-buttons">
                            {Object.entries(priorityMap).map(([key, value]) => ( // Создать отдельный объект-словарь под статусы и мапить его
                                <li
                                    key={key}
                                    className={classNames(
                                        key === priority && `${key}-selected`,
                                        key
                                    )}
                                    onClick={()=>setPriority(key)}
                                >
                                    {value}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flx-right mt-50">
                        <Button title={isEditing ? "Редактировать" : "Добавить"} onClick={handleSubmit}/>
                    </div>
                </div>
            </form>
        </Modal>
    );
};
