import './InputSlider.css';
import { Component } from "react";

export interface InputSliderProps {
    name: string;
    title?: string;
    property?: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onSliderChange: Function;
}

interface InputSliderState {
    value: number;
}

export class InputSlider extends Component<InputSliderProps, InputSliderState> {
    constructor(props: InputSliderProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {value: props.value ?? 100};
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({value: Number(e.target.value)});
        this.props.onSliderChange(Number(e.target.value), this.props.name[0].toLowerCase() + this.props.name.substring(1), this.props.property);
    }

    render() {
        return (
            <div className='grid-24 col-12'>
                <div className="col-8 list-label">{this.props.title ?? this.props.name}:</div>
                <div className="col-11"><input className="input-slider" type="range" name={this.props.name.toLowerCase()} id={this.props.name.toLowerCase()} max={this.props.max} min={this.props.min} value={this.props.value} onChange={this.handleChange} /></div>
                <div className="col-5 text-center">
                    <input className='input-slider-number' type="number" min={this.props.min} max={this.props.max} step={this.props.step} value={this.props.value} onChange={this.handleChange} />
                </div>
            </div>
        );
    }
}
