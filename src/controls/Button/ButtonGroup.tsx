import { ChangeEvent, useState } from "react";

interface ButtonGroupProps {
    name: string;
    items: ButtonGroupItem[];
    value: any;
    className?: string;
    wrapperClass?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface ButtonGroupItem {
    label: string;
    value: any;
}

export const ButtonGroup = (props: ButtonGroupProps) => {

    const [value, setValue] = useState(props.value);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        if (props.onChange) {
            props.onChange(event);
        }
    }

    return (
        <div className={`${props.wrapperClass ?? ''} btn-group`}>
            {props.items.map((item, index) =>
                <label key={item.label} htmlFor={props.name + index} className={props.className ? props.className + ` btn ${value === item.value ? 'active' : ''}` : `btn ${value === item.value ? 'active' : ''}`}>
                    <input type="radio" name={props.name} id={props.name + index} value={item.value} checked={value === item.value} onChange={handleChange} />
                    {item.label}
                </label>
            )}
        </div>
    );
}
