import { Component, MouseEvent, ReactNode } from "react";
import { BoxSizing,
SyncedBox } from "../properties/Box";
import { Display } from "../properties/Display";
import { AlignItems, FlexDirection, JustifyContent } from "../properties/Flex";
import { Position } from "../properties/Position";
import { TextShadow } from "../properties/TextShadow";
import { Border, BorderStyle } from "./../properties/Border";
import { BoxShadowItem } from "./../properties/BoxShadow";

export enum PreviewType {
  Parent = 'parent',
  Child = 'child',
}
export enum PreviewElement {
  Div = 'div',
  Paragraph = 'p',
  Heading = 'h2',
  Subheading = 'h3',
}

export interface Preview {
    [key: string]: any;
    id: number | string;
    cssId: string;
    className: string;
    children?: Preview[] | null;
    content?: string;
    type: PreviewType;
    element: PreviewElement;
    position: Position;
    display: Display;
    boxSizing: BoxSizing;
    flexDirection: FlexDirection;
    justifyContent: JustifyContent;
    alignItems: AlignItems;
    gridColumns: number;
    width: number;
    height: number;
    backgroundColor: string;
    border: Border;
    boxShadows: BoxShadowItem[];
    textShadow: TextShadow;
    margin: SyncedBox;
    padding: SyncedBox;
}

export function initPreview(id: number | string, isChild = false, element?: PreviewElement): Preview {
  return {
    id: id,
    cssId: `${element ? element.toLowerCase() : 'div'}-${id}`,
    className: 'div',
    content: isChild ? (element ? elementToContent(element) : 'div') : undefined,
    children: null,
    type: isChild ? PreviewType.Child : PreviewType.Parent,
    element: element ?? PreviewElement.Div,
    position: Position.Relative,
    display: Display.Flex,
    boxSizing: BoxSizing.BorderBox,
    flexDirection: FlexDirection.Row,
    justifyContent: JustifyContent.FlexStart,
    alignItems: AlignItems.FlexStart,
    gridColumns: 4,
    width: isChild ? 50 : 320,
    height: isChild ? 50 : 240,
    backgroundColor: isChild ? '#cecece' : '#bababa',
    border: {
      width: 0,
      color: '#999999',
      style: BorderStyle.None,
      radius: 0,
    },
    boxShadows: [],
    textShadow: {
      x: 0,
      y: 0,
      blur: 0,
      color: '#000000',
    },
    margin: {
      syncHorizontal: true,
      syncVertical: true,
      syncAll: true,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    padding: {
      syncHorizontal: true,
      syncVertical: true,
      syncAll: true,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  };
}

interface PreviewDivProps {
  preview: Preview;
  selected: boolean;
  onClick: (id: number | string) => void;
  id: number | string;
  children?: ReactNode;
}
interface PreviewDivState {
  preview: Preview;
}

export class PreviewDiv extends Component<PreviewDivProps, PreviewDivState> {
  constructor(props: PreviewDivProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id: number | string, event: MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    this.props.onClick(this.props.id);
  }

  render(): ReactNode {
    const style = {
      display: this.props.preview.display,
      BoxSizing: this.props.preview.boxSizing,
      flexDirection: this.props.preview.flexDirection,
      justifyContent: this.props.preview.justifyContent,
      alignItems: this.props.preview.alignItems,
      gridTemplateColumns: `repeat(${this.props.preview.gridColumns}, 1fr)`,
      width: `${this.props.preview.width}${this.props.preview.type === PreviewType.Child ? '%' : 'px'}`,
      height: `${this.props.preview.height}${this.props.preview.type === PreviewType.Child ? '%' : 'px'}`,
      border: `${this.props.preview.border.width}px ${this.props.preview.border.style} ${this.props.preview.border.color}`,
      borderRadius: `${this.props.preview.border.radius}px`,
      backgroundColor: this.props.preview.backgroundColor,
      boxShadow: `${this.props.preview.boxShadows.map((item) => `${item.style.inset ? 'inset ' : ''}${item.style.x}px ${item.style.y}px ${item.style.blur}px ${item.style.spread}px ${item.style.color}`).join(', ')}`,
      textShadow: `${this.props.preview.textShadow.x}px ${this.props.preview.textShadow.y}px ${this.props.preview.textShadow.blur}px ${this.props.preview.textShadow.color}`,
      margin: `${this.props.preview.margin.top}px ${this.props.preview.margin.right}px ${this.props.preview.margin.bottom}px ${this.props.preview.margin.left}px`,
      padding: `${this.props.preview.padding.top}px ${this.props.preview.padding.right}px ${this.props.preview.padding.bottom}px ${this.props.preview.padding.left}px`,
    };

    switch(this.props.preview.element) {
      case PreviewElement.Paragraph:
        return (
          <p style={style} className={this.props.selected ? 'preview-item selected' : 'preview-item'} onClick={(event) => { this.handleClick(this.props.id, event) }}>{this.props.preview.type === PreviewType.Parent ? this.props.children : this.props.preview.content}</p>
        );
      case PreviewElement.Heading:
        return (
          <h2 style={style} className={this.props.selected ? 'preview-item selected' : 'preview-item'} onClick={(event) => { this.handleClick(this.props.id, event) }}>{this.props.preview.type === PreviewType.Parent ? this.props.children : this.props.preview.content}</h2>
        );
      case PreviewElement.Subheading:
        return (
          <h3 style={style} className={this.props.selected ? 'preview-item selected' : 'preview-item'} onClick={(event) => { this.handleClick(this.props.id, event) }}>{this.props.preview.type === PreviewType.Parent ? this.props.children : this.props.preview.content}</h3>
        );
      case PreviewElement.Div:
      default:
        return (
          <div style={style} className={this.props.selected ? 'preview-item selected' : 'preview-item'} data-id-id={this.props.id} onClick={(event) => { this.handleClick(this.props.id, event) }}>
            {this.props.children}
          </div>
        );
    }
  }
}

const elementToContent = (el: PreviewElement): string => {
  switch(el) {
    case PreviewElement.Div:
      return 'Div';
    case PreviewElement.Heading:
      return 'Heading';
    case PreviewElement.Paragraph:
      return 'Paragraph';
    case PreviewElement.Subheading:
      return 'Subheading';
  }
}
