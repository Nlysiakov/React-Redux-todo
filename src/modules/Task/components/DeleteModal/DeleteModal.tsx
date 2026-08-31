import { Button } from '../../../../shared/UI/Button/Button.tsx';
import { Modal } from '../../../../shared/UI/Modal/Modal.tsx';
import './style.scss';
import { FC } from 'react';
import { TDeleteModalProps } from '../../models/types.tsx'; // Перенести эти пропсы сюда в компонент


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
