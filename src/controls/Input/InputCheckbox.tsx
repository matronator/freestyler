import './InputCheckbox.css';
import { PureComponent } from "react";

export interface InputCheckboxProps {
    name: string;
    title?: string;
    property?: string;
    value: boolean;
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
        this.props.onCheckboxChange(e.target.checked, this.props.name[0].toLowerCase() + this.props.name.substring(1), this.props.property);
    }

    render() {
        return (
            <label className='grid col-12'>
                <div className="col-6 list-label">{this.props.title ?? this.props.name}:</div>
                <div className="col-6"><input className="input-checkbox" type="checkbox" name={this.props.name.toLowerCase()} id={this.props.name.toLowerCase()} checked={this.state.value} onChange={this.handleChange} /></div>
            </label>
        );
    }
}
