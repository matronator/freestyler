import { Component } from "react";

export interface InputSliderProps {
    name: string;
    title?: string;
    property?: string;
    value?: number;
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
        this.props.onSliderChange(Number(e.target.value), this.props.name.toLowerCase(), this.props.property);
    }

    render() {
        return (
            <>
                <div className="col-4 list-label">{this.props.title ?? this.props.name}:</div>
                <div className="col-6"><input className="input-slider" type="range" name={this.props.name.toLowerCase()} id={this.props.name.toLowerCase()} max={this.props.max} min={this.props.min} value={this.state.value} onChange={this.handleChange} /></div>
                <div className="col-2 text-right"><input type="number" min={this.props.min} max={this.props.max} step={this.props.step} value={this.state.value} onChange={this.handleChange} /></div>
            </>
        );
    }
}
