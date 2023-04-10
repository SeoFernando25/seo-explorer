import { readDir } from '$lib/fs.js'

export function load(e) {
    
    return {
        path: e.params.path,
    }
}