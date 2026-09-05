import { IModalProps } from "../../../modules/Task/models/interface.tsx";
import "./style.scss"
import { FC, ReactNode } from "react";

export interface IModalProps {
    children: ReactNode;
    onClose?: () => void
}

export const Modal: FC<IModalProps> = ({ children, onClose }: IModalProps) => {

    const handleOverleyClick=(e: React.MouseEvent<HTMLDivElement>)=>{
        if(e.target===e.currentTarget && onClose){
            onClose()
        }
    }
    return (
        <div className="modal" onClick={handleOverleyClick}>
            <div className="modal-content">
                {children}
            </div>
        </div>
    )
}
