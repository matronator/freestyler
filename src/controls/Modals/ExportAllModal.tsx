import { Component } from "react";
import { Display } from "../../properties/Display";
import { Button } from "../Button/Button";
import { Preview, PreviewType } from "../Preview";
import { PreviewItem } from "../PreviewList";
import { Modal } from "./Modal";

interface ExportAllModalProps {
    previewItems: PreviewItem[];
}

interface ExportAllModalState {
    open: boolean;
}

export class ExportAllModal extends Component<ExportAllModalProps, ExportAllModalState> {
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

    constructor(props: ExportAllModalProps) {
        super(props);
        this.state = { open: false };
        this.toggleModal = this.toggleModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    render() {
        return (
            <>
                <Button onClick={this.toggleModal}>Export All CSS</Button>
                <Modal isOpen={this.state.open} contentLabel='Export CSS modal' title='Export All CSS' footer onClose={this.closeModal}>
                    <p>Here's your CSS:</p>
                    <textarea name="allCss" id="allCss" className="exported-css" cols={30} rows={20} value={this.writeAll(this.props.previewItems).join('\n\n')}>
                    </textarea>
                    <Button data-clipboard-target='#allCss'>Copy</Button>
                </Modal>
            </>
        );
    }

    writeAll(items: PreviewItem[]) {
        return items.map((item, index) => {
            let strings = [];
            strings.push(this.writeCss(item.preview));
            if (item.children) {
                strings.push(item.children.map((child, idx) => {
                    return this.writeCss(child.preview);
                }).join('\n\n'));
            }
            return strings.join('\n\n');
        });
    }

    writeCss(preview: Preview): string {
        return `#${preview.cssId} {
    display: ${preview.display};${[Display.Flex, Display.Grid, Display.InlineFlex, Display.InlineGrid].includes(preview.display) ?
    `
    justify-content: ${preview.justifyContent};
    align-items: ${preview.alignItems};`
    : ''}${[Display.Flex, Display.InlineFlex].includes(preview.display) ? `
    flex-direction: ${preview.flexDirection};` : ''}
    width: ${preview.width}${preview.type === PreviewType.Child ? '%' : 'px'};
    height: ${preview.height}${preview.type === PreviewType.Child ? '%' : 'px'};
    border: ${preview.border.width}px ${preview.border.style} ${preview.border.color};
    border-radius: ${preview.border.radius}px;
    background-color: ${preview.backgroundColor};
    box-shadow: ${preview.boxShadow.x}px ${preview.boxShadow.y}px ${preview.boxShadow.blur}px ${preview.boxShadow.spread}px ${preview.boxShadow.color};
    margin: ${preview.margin.top}px ${preview.margin.right}px ${preview.margin.bottom}px ${preview.margin.left}px;
    padding: ${preview.padding.top}px ${preview.padding.right}px ${preview.padding.bottom}px ${preview.padding.left}px;
}`;
    }
}
