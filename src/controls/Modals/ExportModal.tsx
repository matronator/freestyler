import { Component } from "react";
import { Button } from "../Button/Button";
import { Preview } from "../Preview";
import { exportCss } from "./ExportAllModal";
import { Modal } from "./Modal";

interface ExportModalProps {
    preview: Preview;
    className?: string;
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
                <Button onClick={this.toggleModal} className={this.props.className}>Export CSS</Button>
                <Modal isOpen={this.state.open} contentLabel='Export CSS modal' title='Export CSS' footer onClose={this.closeModal}>
                    <p>Here's your CSS:</p>
                    <textarea name="singleCss" id="singleCss" className="exported-css" cols={30} rows={10}>
                        {this.props.preview && exportCss(this.props.preview)}
                    </textarea>
                    <Button data-clipboard-target='#singleCss'>Copy</Button>
                </Modal>
            </>
        );
    }
}
