import { InputSlider, InputSliderProps } from "../Input/InputSlider";
import { InputCheckbox, InputCheckboxProps } from "../Input/InputCheckbox";
import { PopoverPicker } from "../Input/PopoverPicker";
import { DeleteButton } from "../Button/DeleteButton";
import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";

interface ShadowControlProps {
    id?: number;
    offsetX: InputSliderProps;
    offsetY: InputSliderProps;
    blur: InputSliderProps;
    inset?: InputCheckboxProps;
    spread?: InputSliderProps;
    color: string;
    onColorChange: (color: string) => void;
    deleteItem?: () => void;
    handle?: DraggableProvidedDragHandleProps | null;
    colorLabel: string;
}

export const ShadowControl = (props: ShadowControlProps) => {
    return (
        <>
            {(typeof props.id !== 'undefined' && props.deleteItem) &&
                <div className="col-12 mb-2 grid">
                    <div className="col-1 drag-handle" {...props.handle}>
                        ≡
                    </div>
                    <div className="col-4">
                        {props.inset && <InputCheckbox id={props.id} name={props.inset.name} property={props.inset.property} title={props.inset.title} value={props.inset.value} onCheckboxChange={props.inset.onCheckboxChange} />}
                    </div>
                    <div className="col-6 text-left">
                        <span className="label">Shadow #{props.id}</span>
                    </div>
                    <div className="col-1 py-3 align-middle flex justify-end text-right">
                        <DeleteButton iconOnly={true} onClick={props.deleteItem} />
                    </div>
                </div>
            }
            <InputSlider id={props.id} name={props.offsetX.name} property={props.offsetX.property} title={props.offsetX.title} value={props.offsetX.value} min={props.offsetX.min} max={props.offsetX.max} step={props.offsetX.step} onSliderChange={props.offsetX.onSliderChange} />
            <InputSlider id={props.id} name={props.offsetY.name} property={props.offsetY.property} title={props.offsetY.title} value={props.offsetY.value} min={props.offsetY.min} max={props.offsetY.max} step={props.offsetY.step} onSliderChange={props.offsetY.onSliderChange} />
            <InputSlider id={props.id} name={props.blur.name} property={props.blur.property} title={props.blur.title} value={props.blur.value} min={props.blur.min} max={props.blur.max} step={props.blur.step} onSliderChange={props.blur.onSliderChange} />
            {props.spread && <InputSlider id={props.id} name={props.spread.name} property={props.spread.property} title={props.spread.title} value={props.spread.value} min={props.spread.min} max={props.spread.max} step={props.spread.step} onSliderChange={props.spread.onSliderChange} />}
            <div className='col-4 list-label'>{props.colorLabel}</div><div className='col-8 text-right w-100'><PopoverPicker color={props.color} onChange={props.onColorChange} /></div>
        </>
    );
}
