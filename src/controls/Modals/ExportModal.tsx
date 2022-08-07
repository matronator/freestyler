import { Component } from "react";
import { Button } from "../Button/Button";
import { Modal } from "./Modal";

interface ExportModalProps {

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
                </Modal>
            </>
        );
    }
}
