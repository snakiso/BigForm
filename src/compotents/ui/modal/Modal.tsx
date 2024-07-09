import './modal.scss'
import './modal.scss'
import {ReactNode, useEffect} from "react";

type ModalProps = {
    close: () => void
    isOpen: boolean
    status: string
    children: ReactNode
}

export const Modal = ({close, children, isOpen, status}: ModalProps) => {


    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        return () => {
            document.body.style.overflow = 'auto';
            document.body.style.position = 'static';
        }
    }, []);

    if (!isOpen) return null;

    return (
        <div className={'modal-overlay'} onClick={close}>
            <div className={'modal' + ' ' + `modal_${status}`}>
                <button className={'modal__button modal__button_cross'} onClick={close}></button>
                <div className={'modal__inner'}>
                    {children}
                    <button className={'modal__button'} onClick={close}>
                        Ок
                    </button>
                </div>
            </div>
        </div>
    )
}
