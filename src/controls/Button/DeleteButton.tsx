import { Button } from "./Button";
import { TrashIcon } from "../../components/TrashIcon";
import { useState } from "react";

interface DeleteButtonProps {
    disabled?: boolean;
    iconOnly?: boolean;
    onClick: () => void;
}

export function DeleteButton(props: DeleteButtonProps) {
    const [hovered, setHovered] = useState(false);

    if (props.iconOnly) {
        return (
            <a className='ml-1 btn-icon' onClick={props.onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                <TrashIcon isOpen={false} />
            </a>
        );
    }

    return (
        <Button className='btn-sm btn-icon btn-delete ml-1' disabled={props.disabled} onClick={props.onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <TrashIcon isOpen={hovered} />{" Delete"}
        </Button>
    );
}
