import { InputSlider, InputSliderProps } from "../Input/InputSlider";
import { InputCheckbox, InputCheckboxProps } from "../Input/InputCheckbox";
import { PopoverPicker } from "../Input/PopoverPicker";

interface ShadowControlProps {
    offsetX: InputSliderProps;
    offsetY: InputSliderProps;
    blur: InputSliderProps;
    inset?: InputCheckboxProps;
    spread?: InputSliderProps;
    color: string;
    onColorChange: (color: string) => void;
    colorLabel: string;
}

export const ShadowControl = (props: ShadowControlProps) => {
    return (
        <>
            <InputSlider name={props.offsetX.name} property={props.offsetX.property} title={props.offsetX.title} value={props.offsetX.value} min={props.offsetX.min} max={props.offsetX.max} step={props.offsetX.step} onSliderChange={props.offsetX.onSliderChange} />
            <InputSlider name={props.offsetY.name} property={props.offsetY.property} title={props.offsetY.title} value={props.offsetY.value} min={props.offsetY.min} max={props.offsetY.max} step={props.offsetY.step} onSliderChange={props.offsetY.onSliderChange} />
            <InputSlider name={props.blur.name} property={props.blur.property} title={props.blur.title} value={props.blur.value} min={props.blur.min} max={props.blur.max} step={props.blur.step} onSliderChange={props.blur.onSliderChange} />
            {props.spread && <InputSlider name={props.spread.name} property={props.spread.property} title={props.spread.title} value={props.spread.value} min={props.spread.min} max={props.spread.max} step={props.spread.step} onSliderChange={props.spread.onSliderChange} />}
            {props.inset && <InputCheckbox name={props.inset.name} property={props.inset.property} title={props.inset.title} value={props.inset.value} onCheckboxChange={props.inset.onCheckboxChange} />}
            <div className='col-4 list-label'>{props.colorLabel}</div><div className='col-8 text-right w-100'><PopoverPicker color={props.color} onChange={props.onColorChange} /></div>
        </>
    );
}
