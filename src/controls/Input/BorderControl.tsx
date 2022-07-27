import { ChangeEventHandler, Component, ReactNode } from 'react';
import { BorderStyle } from './../../properties/Border';
import { InputSlider, InputSliderProps } from './InputSlider';
import { PopoverPicker } from './PopoverPicker';
import { SelectInput } from './SelectInput';

interface BorderControlProps {
    sliderProps: InputSliderProps;
    color: string;
    onPickerChange: Function;
    onSelectChange: Function;
    selectValue: BorderStyle;
}

interface BorderControlState {
    color: string;
}

export class BorderControl extends Component<BorderControlProps, BorderControlState> {
    render(): ReactNode {
        return (
            <>
                <InputSlider
                    name={this.props.sliderProps.name}
                    property={this.props.sliderProps.property}
                    value={this.props.sliderProps.value}
                    min={this.props.sliderProps.min}
                    max={this.props.sliderProps.max}
                    step={this.props.sliderProps.step}
                    onSliderChange={this.props.sliderProps.onSliderChange}/>
                <div className='col-4 mt-2'>
                    <SelectInput className='w-90' name='border' property='style' id='borderStyle' onSelectChange={this.props.onSelectChange} items={Object.values(BorderStyle)} value={this.props.selectValue} />
                </div>
                <div className="col-8 text-right w-100 mt-2">
                    <PopoverPicker color={this.props.color} onChange={this.props.onPickerChange} />
                </div>
            </>
        );
    }
}
