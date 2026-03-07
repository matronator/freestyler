import './InputCheckbox.css';
import { PureComponent } from "react";

export interface InputCheckboxProps {
    id?: number;
    name: string;
    title?: string;
    property?: string;
    value: boolean;
    cols?: [number, number];
    disabled?: boolean;
    onCheckboxChange: Function;
}

interface InputCheckboxState {
    value: boolean;
}

export class InputCheckbox extends PureComponent<InputCheckboxProps, InputCheckboxState> {
    constructor(props: InputCheckboxProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {value: props.value};
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({value: e.target.checked});
        this.props.onCheckboxChange(e.target.checked, this.props.name[0].toLowerCase() + this.props.name.substring(1), this.props.property, this.props.id);
    }

    render() {
        return (
            <label className='grid col-12 align-middle'>
                <div className={`col-${this.props.cols ? this.props.cols[0] : 6} list-label`}>{this.props.title ?? this.props.name}:</div>
                <div className={`col-${this.props.cols ? this.props.cols[1] : 6} text-left pl-1`}><input className="input-checkbox align-middle" type="checkbox" disabled={this.props.disabled} name={this.props.name.toLowerCase()} id={this.props.name.toLowerCase()} checked={this.props.value} onChange={this.handleChange} /></div>
            </label>
        );
    }
}
