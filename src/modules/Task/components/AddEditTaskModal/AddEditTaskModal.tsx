import classNames from 'classnames';
import Close from '../../../../shared/assets/icons/close.svg?react';
import { Button } from '../../../../shared/UI/Button/Button.tsx';
import { Input } from '../../../../shared/UI/Input/Input.tsx';
import { Modal } from '../../../../shared/UI/Modal/Modal.tsx';
import './style.scss';
import { FC, FormEvent, useState } from 'react';
import { TAddEditTaskModalProps } from '../../models/types.tsx';

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
        const taskData = {
            title,
            priority,
            status,
            ...(isEditing && { id: initialData.id }) // требуется проверить на наличие объекта
        }
        onSubmit(taskData)
    }

    return (
        <Modal onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="add-edit-modal">
                    <div className="flx-between">
                        <span className="modal-title">{isEditing ? "Редактировать задачу" : "Добавить задачу"}</span>
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
                            {['high', 'medium', 'low'].map((p) => ( // Создать отдельный объект-словарь под статусы и мапить его
                                <li
                                    key={p}
                                    className={classNames(
                                        p === priority && `${p}-selected`, p)}
                                    onClick={() => setPriority(p)}
                                >
                                    {p === "high" ? "Высокий" : p === "medium" ? "Средний" : "Низкий"}
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
