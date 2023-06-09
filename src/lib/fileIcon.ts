export function fileIcon(filename: string): string {
    const map: Map<string, string> = new Map();
    map.set('.desktop', 'fa-gear');
    map.set('.pdf', 'fa-file-pdf');
    map.set('.asc', 'fa-file-signature');
    map.set('.zip', 'fa-file-archive');
    map.set('.tar', 'fa-file-archive');
    map.set('.tar.gz', 'fa-file-archive');
    map.set('.tar.bz2', 'fa-file-archive');
    map.set('.mp3', 'fa-file-audio');
    map.set('.ogg', 'fa-file-audio');
    map.set('.wav', 'fa-file-audio');
    map.set('.flac', 'fa-file-audio');
    map.set('.mid', 'fa-file-audio');
    map.set('.m4a', 'fa-file-audio');
    map.set('.aac', 'fa-file-audio');
    map.set('.wma', 'fa-file-audio');
    map.set('.png', 'fa-file-image');
    map.set('.jpg', 'fa-file-image');
    map.set('.jpeg', 'fa-file-image');
    map.set('.gif', 'fa-file-image');
    map.set('.bmp', 'fa-file-image');
    map.set('.ico', 'fa-file-image');
    map.set('.svg', 'fa-file-image');
    map.set('.txt', 'fa-file-alt');
    map.set('.md', 'fa-file-alt');
    map.set('.html', 'fa-file-code');
    map.set('.css', 'fa-file-code');
    map.set('.js', 'fa-file-code');
    map.set('.ts', 'fa-file-code');
    map.set('.json', 'fa-file-code');
    map.set('.xml', 'fa-file-code');
    map.set('.py', 'fa-file-code');
    map.set('.c', 'fa-file-code');
    map.set('.cpp', 'fa-file-code');
    map.set('.h', 'fa-file-code');
    map.set('.hpp', 'fa-file-code');
    map.set('.rs', 'fa-file-code');
    map.set('.go', 'fa-file-code');
    map.set('.java', 'fa-file-code');
    map.set('.mp4', 'fa-file-video');
    map.set('.mkv', 'fa-file-video');
    map.set('.avi', 'fa-file-video');
    map.set('.mov', 'fa-file-video');
    map.set('.wmv', 'fa-file-video');
    map.set('.webm', 'fa-file-video');
    map.set('.flv', 'fa-file-video');
    map.set('.mpeg', 'fa-file-video');
    map.set('.mpg', 'fa-file-video');
    map.set('.m4v', 'fa-file-video');
    map.set('.3gp', 'fa-file-video');
    map.set('.ogv', 'fa-file-video');
    map.set('.doc', 'fa-file-word');
    map.set('.docx', 'fa-file-word');
    map.set('.xls', 'fa-file-excel');
    map.set('.xlsx', 'fa-file-excel');
    map.set('.ppt', 'fa-file-powerpoint');
    map.set('.pptx', 'fa-file-powerpoint');
    map.set('.torrent', 'fa-network-wired');
    map.set('.drawio', 'fa-draw-polygon');

    // Check if file extension is in map
    const ext = filename.split('.').pop();
    const icon = map.get(`.${ext}`);
    return icon ?? 'fa-file';
}