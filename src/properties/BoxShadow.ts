export interface BoxShadow {
    x: number;
    y: number;
    blur: number;
    spread: number;
    color: string;
    inset: boolean;
}

export interface BoxShadowItem {
    id: number;
    order: number;
    enabled: boolean;
    style: BoxShadow;
}
