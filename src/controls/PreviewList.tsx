import { PureComponent } from "react";
import { Preview, PreviewDiv } from "./Preview";

export interface PreviewItem {
    id: number;
    preview: Preview;
    selected: boolean;
}

interface PreviewListProps {
    items: PreviewItem[];
    activeIndex: number;
    activePreview: Preview;
    onSelectItem: (id: number) => void;
}

interface PreviewListState {
}

export class PreviewList extends PureComponent<PreviewListProps, PreviewListState> {
    render() {
        return this.props.items && this.props.items.map((item, index) => <PreviewDiv key={item.id} id={item.id} onClick={() => this.props.onSelectItem(item.id)} selected={item.selected} preview={item.id === this.props.activeIndex ? this.props.activePreview : item.preview} />) || null;
    }
}
