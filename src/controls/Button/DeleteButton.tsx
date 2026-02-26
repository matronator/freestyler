import { Button } from "./Button";
import { TrashIcon } from "../../components/TrashIcon";
import { useState } from "react";

interface DeleteButtonProps {
    disabled: boolean;
    onClick: () => void;
}

export function DeleteButton(props: DeleteButtonProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <Button className='btn-sm btn-icon btn-delete ml-1' disabled={props.disabled} onClick={props.onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <TrashIcon isOpen={hovered} />&nbsp;Delete
        </Button>
    );
}
