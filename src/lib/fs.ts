import { invoke } from '@tauri-apps/api/tauri'

export interface FileEntry {
    name: string
    path: string
    children?: FileEntry[]
    icon?: string
}

export function readDir(path: string, recursive: boolean = false): Promise<FileEntry[]> {
    return invoke('read_dir', { path, recursive });
}

export function isDir(entry: FileEntry): boolean {
    return entry.children !== null;
}