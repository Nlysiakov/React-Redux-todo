import classNames from 'classnames';
import Close from '../../../../shared/assets/icons/close.svg?react';
import { Button } from '../../../../shared/UI/Button/Button.tsx';
import { Input } from '../../../../shared/UI/Input/Input.tsx';
import { Modal } from '../../../../shared/UI/Modal/Modal.tsx';
import './style.scss';
import { FC, FormEvent, useState } from 'react';
import { TAddEditTaskModalProps } from '../../models/types.tsx';


const priorityMap = { // Забыл удалить отсюда?
    high: "Высокий",
    medium: "Средний",
    low: "Низкий"
}

export const AddEditTaskModal: FC<TAddEditTaskModalProps> = ({
                                                                 onClose,
                                                                 initialData,
                                                                 onSubmit
                                                             }) => {

    const isEditing = !!initialData // isEditing

    const [title, setTitle] = useState(initialData?.title || "")
    const [priority, setPriority] = useState(initialData?.priority || "medium")
    /*
        Ты никак не изменяешь состояние, в таком случае следует его просто сразу задавать в объекте при создании/редактировании
        и конечно же нам не нужно его впустую так создавать,
        либо нужно создать ещё возможность менять его при редактировании,
        в таком случае разделение функции редактирования и создания как раз нам и поможет(но это будет сейчас трата времени, можешь не создавать)
     */
    const [status] = useState(initialData?.status || "todo")

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        let taskData: any = { // Как any типизировать не стоит, так как для объекта таски у тебя уже существует тип и на let менять тут незачем
            title,
            priority,
            status,
        }
        /*
            Так лучше не делать, мы специально разделяем функционал создания и редактирования;
            поэтому тут следует условие разделить на проверку таким образом, что если у тебя открыта форма редактирования и существует initialData,
            то вызывать функцию редактирования таски, а иначе функция для создания таски и передавать соответствующие аргументы.
            Тогда именно тут нам не потребуется создавать объект taskData, onSubmit у тебя не будет,
            в соответствующие функции сразу будешь передавать, что требуется
         */
        if (initialData) {
            taskData.id = initialData.id
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
                                    onClick={() => setPriority(key)}
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
