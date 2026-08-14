import "./style.scss"

export const Modal = ({ children, onClose}) => {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
        {children}
        </div>
    </div>
  )
}

export default Modal
