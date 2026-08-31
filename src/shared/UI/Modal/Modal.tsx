import { IModalProps } from "../../../modules/Task/models/interface.tsx";
import "./style.scss"
import { FC, ReactNode } from "react";

export interface IModalProps {
    children: ReactNode;
    onClose?: () => void
}

/*
    Исправить обработку закрытия по оверлею на способ сравнивания e.target и e.currentTarget
 */
export const Modal: FC<IModalProps> = ({ children, onClose }: IModalProps) => {
    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
