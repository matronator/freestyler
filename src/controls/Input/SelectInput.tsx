import './SelectInput.css';
import { Component, CSSProperties, ReactNode } from "react";

interface SelectInputProps {
    name: string;
    property?: string;
    type?: string;
    id: string;
    items: Array<any>;
    onSelectChange: Function;
    className?: string;
    style?: CSSProperties;
    value: any;
};
interface SelectInputState {
    value: any;
};

export class SelectInput extends Component<SelectInputProps, SelectInputState> {
    constructor(props: SelectInputProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {value: props.value};
    }

    handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({value: e.target.value.toString()});
        this.props.onSelectChange(e.target.value.toString(), this.props.name[0].toLowerCase() + this.props.name.substring(1), this.props.property);
    }

    render(): ReactNode {
        return (
            <select className={[this.props.className, 'select-input'].join(' ')} value={this.props.value} style={this.props.style} name={this.props.name} id={this.props.id} onChange={this.handleChange}>
                {this.props.items.map((item: string, key: number) =>
                    <option key={key} value={item}>{item}</option>
                )}
            </select>
        );
    }
}
