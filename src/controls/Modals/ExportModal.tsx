import { Component } from "react";
import { Button } from "../Button/Button";
import { Preview, PreviewType } from "../Preview";
import { Modal } from "./Modal";

interface ExportModalProps {
    preview: Preview;
}

interface ExportModalState {
    open: boolean;
}

export class ExportModal extends Component<ExportModalProps, ExportModalState> {
    toggleModal() {
        this.setState(prevState => (
            {
                open: !prevState.open,
            }
        ));
    }

    closeModal() {
        this.setState({open: false});
    }

    constructor(props: ExportModalProps) {
        super(props);
        this.state = { open: false };
        this.toggleModal = this.toggleModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    render() {
        return (
            <>
                <Button onClick={this.toggleModal}>Export CSS</Button>
                <Modal isOpen={this.state.open} contentLabel='Export CSS modal' title='Export CSS' footer onClose={this.closeModal}>
                    <p>Here's your CSS:</p>
                    <textarea name="singleCss" id="singleCss" className="exported-css" cols={30} rows={10}>
                        {this.props.preview && `#${this.props.preview.cssId} {
    display: ${this.props.preview.display};
    flex-direction: ${this.props.preview.flexDirection};
    width: ${this.props.preview.width}${this.props.preview.type === PreviewType.Child ? '%' : 'px'};
    height: ${this.props.preview.height}${this.props.preview.type === PreviewType.Child ? '%' : 'px'};
    border: ${this.props.preview.border.width}px ${this.props.preview.border.style} ${this.props.preview.border.color};
    border-radius: ${this.props.preview.border.radius}px;
    background-color: ${this.props.preview.backgroundColor};
    box-shadow: ${this.props.preview.boxShadow.x}px ${this.props.preview.boxShadow.y}px ${this.props.preview.boxShadow.blur}px ${this.props.preview.boxShadow.spread}px ${this.props.preview.boxShadow.color};
    margin: ${this.props.preview.margin.top}px ${this.props.preview.margin.right}px ${this.props.preview.margin.bottom}px ${this.props.preview.margin.left}px;
    padding: ${this.props.preview.padding.top}px ${this.props.preview.padding.right}px ${this.props.preview.padding.bottom}px ${this.props.preview.padding.left}px;
}`}
                    </textarea>
                    <Button data-clipboard-target='#singleCss'>Copy</Button>
                </Modal>
            </>
        );
    }
}
