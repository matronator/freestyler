import './../../styles/modal.scss';
import { ReactNode } from 'react';
import ReactModal from 'react-modal';
import { Button } from './../Button/Button';

interface ModalProps {
    isOpen: boolean;
    contentLabel: string;
    title?: string;
    footer?: boolean;
    onClose: (event: any) => void;
    children?: ReactNode;
}

export const Modal = (props: ModalProps) => {
    return (
        <ReactModal
            isOpen={props.isOpen}
            contentLabel={props.contentLabel}
            appElement={document.getElementById('root')!}
            className='modal'
            overlayClassName='modal-overlay'
            onRequestClose={props.onClose}
        >
            {props.title && <div className='modal-header'>
                <h3>{props.title}</h3>
            </div>}
            <div className="modal-body">
                {props.children}
            </div>
            {props.footer && <div className='modal-footer'>
                <Button onClick={props.onClose} className='btn-red'>Close</Button>
            </div>}
        </ReactModal>
    );
}
