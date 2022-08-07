import { PureComponent } from "react";
import { Preview, PreviewDiv } from "./Preview";

export interface PreviewItem {
    id: number | string;
    preview: Preview;
    selected: boolean;
    children?: PreviewItem[] | null;
    isParent: boolean;
}

interface PreviewListProps {
    items: PreviewItem[];
    activeIndex: number | string;
    activePreview: Preview;
    onSelectItem: (id: number | string) => void;
}

interface PreviewListState {
}

export class PreviewList extends PureComponent<PreviewListProps, PreviewListState> {
    render() {
        return this.props.items && this.props.items.map((item, index) =>
            <PreviewDiv key={item.id} id={item.id} onClick={() => this.props.onSelectItem(item.id)} selected={item.selected} preview={item.id === this.props.activeIndex ? this.props.activePreview : item.preview}>
                {item.children && item.children.map((child, idx) =>
                    <PreviewDiv key={child.id} id={child.id} onClick={() => this.props.onSelectItem(child.id)} selected={child.selected} preview={child.id === this.props.activeIndex ? this.props.activePreview : child.preview} />
                )}
            </PreviewDiv>
        );
    }
}
