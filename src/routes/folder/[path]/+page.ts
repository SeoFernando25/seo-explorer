import { readDir } from '$lib/fs.js'

export function load(e) {
    const files =  readDir(e.params.path)

    return {
        path: e.params.path,
        files
    }
}