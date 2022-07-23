export enum BorderStyle {
    None = 'none',
    Hidden = 'hidden',
    Dotted = 'dotted',
    Dashed = 'dashed',
    Solid = 'solid',
    Double = 'double',
    Groove = 'groove',
    Ridge = 'ridge',
    Inset = 'inset',
    Outset = 'outset',
}

export interface Border {
    width: number;
    color: string;
    style: BorderStyle;
    radius: number;
}
