import React, { Component, MouseEvent, ReactNode } from "react";
import { Border, BorderStyle } from "./../properties/Border";
import { BoxShadow } from "./../properties/BoxShadow";

export interface Preview {
    [key: string]: any;
    id: number;
    width: number;
    height: number;
    backgroundColor: string;
    border: Border;
    boxShadow: BoxShadow;
}

export function initPreview(id: number): Preview {
  return {
    id: id,
    width: 100,
    height: 100,
    backgroundColor: '#cecece',
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
    }
  };
}

interface PreviewDivProps {
  preview: Preview;
  selected: boolean;
  onClick: (id: number) => void;
  id: number;
}
interface PreviewDivState {
  preview: Preview;
}

export class PreviewDiv extends Component<PreviewDivProps, PreviewDivState> {
  constructor(props: PreviewDivProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event: MouseEvent<HTMLDivElement>, id: number) {
    this.props.onClick(id);
  }

  render(): ReactNode {
    return (
      <div style={{
        width: `${this.props.preview.width}px`,
        height: `${this.props.preview.height}px`,
        border: `${this.props.preview.border.width}px ${this.props.preview.border.style} ${this.props.preview.border.color}`,
        borderRadius: `${this.props.preview.border.radius}px`,
        backgroundColor: this.props.preview.backgroundColor,
        boxShadow: `${this.props.preview.boxShadow.x}px ${this.props.preview.boxShadow.y}px ${this.props.preview.boxShadow.blur}px ${this.props.preview.boxShadow.spread}px ${this.props.preview.boxShadow.color}`,
      }} id="preview" onClick={(event) => this.handleClick(event, this.props.id)}></div>
    );
  }
}
