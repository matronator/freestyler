import React, { Component, MouseEvent, ReactNode } from "react";
import { Box } from "../properties/Box";
import { Display } from "../properties/Display";
import { AlignItems, FlexDirection, JustifyContent } from "../properties/Flex";
import { Position } from "../properties/Position";
import { Border, BorderStyle } from "./../properties/Border";
import { BoxShadow } from "./../properties/BoxShadow";

export enum PreviewType {
  Parent = 'parent',
  Child = 'child',
}
export enum PreviewElement {
  Div = 'div',
  Paragraph = 'paragraph',
  Heading = 'heading',
  Subheading = 'subheading',
}

export interface Preview {
    [key: string]: any;
    id: number | string;
    cssId: string;
    className: string;
    children?: Preview[] | null;
    type: PreviewType;
    element: PreviewElement;
    position: Position;
    display: Display;
    flexDirection: FlexDirection;
    justifyContent: JustifyContent;
    alignItems: AlignItems;
    width: number;
    height: number;
    backgroundColor: string;
    border: Border;
    boxShadow: BoxShadow;
    margin: Box;
    padding: Box;
}

export function initPreview(id: number | string, isChild = false, element?: PreviewElement): Preview {
  return {
    id: id,
    cssId: `div${id}`,
    className: 'div',
    children: null,
    type: isChild ? PreviewType.Child : PreviewType.Parent,
    element: element ?? PreviewElement.Div,
    position: Position.Relative,
    display: Display.Flex,
    flexDirection: FlexDirection.Row,
    justifyContent: JustifyContent.Start,
    alignItems: AlignItems.Start,
    width: isChild ? 50 : 100,
    height: isChild ? 50 : 100,
    backgroundColor: isChild ? '#cecece' : '#bababa',
    border: {
      width: 0,
      color: '#999999',
      style: BorderStyle.None,
      radius: 0,
    },
    boxShadow: {
      x: 0,
      y: 0,
      blur: 0,
      spread: 0,
      color: '#000000',
    },
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    padding: {
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

  handleClick(event: MouseEvent<HTMLElement>) {
    event.stopPropagation();
    this.props.onClick(this.props.id);
  }

  render(): ReactNode {
    const style = {
      display: this.props.preview.display,
      flexDirection: this.props.preview.flexDirection,
      width: `${this.props.preview.width}${this.props.preview.type === PreviewType.Child ? '%' : 'px'}`,
      height: `${this.props.preview.height}${this.props.preview.type === PreviewType.Child ? '%' : 'px'}`,
      border: `${this.props.preview.border.width}px ${this.props.preview.border.style} ${this.props.preview.border.color}`,
      borderRadius: `${this.props.preview.border.radius}px`,
      backgroundColor: this.props.preview.backgroundColor,
      boxShadow: `${this.props.preview.boxShadow.x}px ${this.props.preview.boxShadow.y}px ${this.props.preview.boxShadow.blur}px ${this.props.preview.boxShadow.spread}px ${this.props.preview.boxShadow.color}`,
      margin: `${this.props.preview.margin.top}px ${this.props.preview.margin.right}px ${this.props.preview.margin.bottom}px ${this.props.preview.margin.left}px`,
      padding: `${this.props.preview.padding.top}px ${this.props.preview.padding.right}px ${this.props.preview.padding.bottom}px ${this.props.preview.padding.left}px`,
    };

    switch(this.props.preview.element) {
      case PreviewElement.Paragraph:
        return (
          <p style={style} className={this.props.selected ? 'preview-item selected' : 'preview-item'} onClick={this.handleClick}>{this.props.children}</p>
        );
      case PreviewElement.Heading:
        return (
          <h2 style={style} className={this.props.selected ? 'preview-item selected' : 'preview-item'} onClick={this.handleClick}>{this.props.children}</h2>
        );
      case PreviewElement.Subheading:
        return (
          <h3 style={style} className={this.props.selected ? 'preview-item selected' : 'preview-item'} onClick={this.handleClick}>{this.props.children}</h3>
        );
      case PreviewElement.Div:
      default:
        return (
          <div style={style} className={this.props.selected ? 'preview-item selected' : 'preview-item'} data-id-id={this.props.id} onClick={this.handleClick}>
            {this.props.children}
          </div>
        );
    }
  }
}
