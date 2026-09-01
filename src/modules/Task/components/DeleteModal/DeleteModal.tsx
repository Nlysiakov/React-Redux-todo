import { Button } from '../../../../shared/UI/Button/Button.tsx';
import { Modal } from '../../../../shared/UI/Modal/Modal.tsx';
import './style.scss';
import { FC } from 'react';


type TDeleteModalProps = {
    onClose: () => void;
    taskTitle?: string;
    onDelete: () => void
}

export const DeleteModal: FC<TDeleteModalProps> = ({ onClose, onDelete }) => (
    <Modal>
        <div className="delete-modal">
            <p>Точно удалить задачу?</p>
            <div className="delete-modal__actions">
                <Button title="Удалить" onClick={onDelete}/>
                <Button title="Выйти" outline onClick={onClose}/>
            </div>
        </div>
    </Modal>
);
