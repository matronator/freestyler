import { ChangeEventHandler, Component, CSSProperties, ReactNode } from "react";

interface SelectInputProps {
    name: string;
    id: string;
    items: Array<any>;
    onChange: ChangeEventHandler<HTMLSelectElement>;
    className?: string;
    style?: CSSProperties;
};
interface SelectInputState {};

export class SelectInput extends Component<SelectInputProps, SelectInputState> {
    constructor(props: SelectInputProps) {
        super(props);
        this.state = {};
    }

    render(): ReactNode {
        return (
            <select className={this.props.className} style={this.props.style} name={this.props.name} id={this.props.id} onChange={this.props.onChange}>
                {this.props.items.map((item: string, key: number) =>
                    <option key={key} value={item}>{item}</option>
                )}
            </select>
        );
    }
}
