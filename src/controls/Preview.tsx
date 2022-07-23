import { Component, ReactNode } from "react";
import { Border, BorderStyle } from "../properties/Border";

export interface Preview {
    [key: string]: any;
    width: number;
    height: number;
    backgroundColor: string;
    border: Border;
}

export function initPreview(): Preview {
  return {
    width: 100,
    height: 100,
    backgroundColor: '#cecece',
    border: {
      width: 0,
      color: '#999999',
      style: BorderStyle.None,
      radius: 0,
    }
  };
}

interface PreviewDivProps {
  preview: Preview;
}
interface PreviewDivState {
  preview: Preview;
}

export class PreviewDiv extends Component<PreviewDivProps, PreviewDivState> {
  render(): ReactNode {
    return (
      <div style={{
        width: `${this.props.preview.width}px`,
        height: `${this.props.preview.height}px`,
        border: `${this.props.preview.border.width}px ${this.props.preview.border.style} ${this.props.preview.border.color}`,
        borderRadius: `${this.props.preview.border.radius}px`,
        backgroundColor: this.props.preview.backgroundColor,
      }} id="preview"></div>
    );
  }
}
