export interface Box {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export interface SyncedBox extends Box {
    syncHorizontal: boolean;
    syncVertical: boolean;
    syncAll: boolean;
}

export type BoxSizing = 'border-box' | 'content-box';

export const BoxSizing = {
    BorderBox: 'border-box',
    ContentBox: 'content-box',
} as const;
