import classNames from 'classnames';
import Close from '../../../../shared/assets/icons/close.svg?react';
import { Button } from '../../../../shared/UI/Button/Button.tsx';
import { Input } from '../../../../shared/UI/Input/Input.tsx';
import { Modal } from '../../../../shared/UI/Modal/Modal.tsx';
import './style.scss';
import { FC, FormEvent, useState } from 'react';
import { TTask } from '../../models/types.tsx';
import { EPriority, EStatus } from '../../models/enum.ts';
import { priorityMap } from '../../models/constants.ts';

type TTaskFormData = Omit<TTask, "id" | "progress">

type TAddEditTaskModalProps = {
    onClose: () => void;
    initialData?: TTask | null;
    addTodo: (taskData: TTaskFormData)=> void;
    editTodo: (taskData: TTask)=>void
};


export const AddEditTaskModal: FC<TAddEditTaskModalProps> = ({
    onClose,
    initialData,
    addTodo,
    editTodo
    }) => {

    const isEditing = !!initialData

    const [title, setTitle] = useState(initialData?.title || "")
    const [priority, setPriority] = useState(initialData?.priority || EPriority.MEDIUM)


    const handleAddSubmit=(e: FormEvent)=>{
        e.preventDefault()
        const taskData: TTaskFormData={
            title,
            priority,
            status: EStatus.TODO
        }
        addTodo(taskData)
        onClose()
    }

    const handleEditSubmit=(e:FormEvent)=>{
        e.preventDefault()
        if(!initialData) return

        const editData: TTask={
            title,
            priority,
            status: EStatus.TODO,
            id: initialData.id,
            progress: initialData.progress
        }
        editTodo(editData)
        onClose()
    }

    const handleSubmit=isEditing ? handleEditSubmit : handleAddSubmit





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
                            {Object.values(EPriority).map((p) => (
                                <li
                                    key={p}
                                    className={classNames(
                                        p === priority && `${p}-selected`,
                                        p
                                    )}
                                    onClick={() => setPriority(p)}
                                >
                                    {priorityMap[p]}
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
