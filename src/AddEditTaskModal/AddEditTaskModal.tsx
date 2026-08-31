import classNames from 'classnames';
import Close from '../assets/icons/close.svg?react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Modal } from '../Modal/Modal';
import './style.scss';
import { FC, FormEvent, useState } from 'react';
import { TAddEditTaskModalProps, TTask } from '../types/Types';


export const AddEditTaskModal: FC<TAddEditTaskModalProps> = ({
  onClose,
  initialData, 
  onSubmit} ) => {

  const isEditing = !!initialData

  const [ title, setTitle ] = useState<string>( initialData?.title || "" )
  const [ priority, setPriority ] = useState<TTask["priority"]>( initialData?.priority || "medium" )
  const [ status ] = useState<TTask["status"]>( initialData?.status || "todo" )

  const handleSubmit=(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const taskData={
      title,
      priority,
      status,
      ...(isEditing && {id: initialData.id})
    }
    onSubmit(taskData)
  }

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="add-edit-modal">
          <div className="flx-between">
            <span className="modal-title">{isEditing ? "Редактировать задачу" : "Добавить задачу"}</span>
            <Close className="cp" onClick={onClose} />
          </div>
          <Input
            label="Задача"
            placeholder="Введите текст.."
            onChange={(e) => {setTitle(e.target.value)}}
            name="title"
            value={title}
          />
          <div className="modal-priority">
            <span>Приоритет</span>
            <ul className="priority-buttons">
              {[ 'high', 'medium', 'low' ].map((p) => (
                <li
                  key={p}
                  className = {classNames(
                    p === priority && `${p}-selected`, p)}
                    onClick={()=>setPriority(p)}
                >
                  { p === "high" ? "Высокий" : p === "medium" ? "Средний" : "Низкий" }
                </li>
              ))}
            </ul>
          </div>
          <div className="flx-right mt-50">
            <Button title={isEditing ? "Редактировать" : "Добавить"} onClick={handleSubmit} />
          </div>
        </div>
      </form>
    </Modal>
  );
};
