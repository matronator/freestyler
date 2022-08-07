import './Button.scss';
import { ReactNode, MouseEventHandler } from 'react';

interface ButtonProps {
    className?: string;
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children?: ReactNode;
}

export const Button = (props: ButtonProps) => {
    return (
        <button {...props} className={`btn ${props.className ?? ''}`}>{props.children}</button>
    );
}
