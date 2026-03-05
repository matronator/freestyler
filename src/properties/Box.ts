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
