import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import './style.scss';
import { FC } from 'react';
import { TDeleteModalProps } from '../types/Types';


export const DeleteModal:FC<TDeleteModalProps> = ({onClose, onDelete})=> {
  const handleDelete = () =>{
    onDelete()
    onClose()
  }
  return (
    <Modal>
      <div className="delete-modal">
        <p>Точно удалить задачу?</p>
        <div className="delete-modal__actions">
          <Button title="Удалить" onClick={handleDelete} />
          <Button title="Выйти" outline onClick={onClose} />
        </div>
      </div>
    </Modal>
  );
};
