export function formatFileSize(filesize) {
    if (!filesize) {
        return "-";
    }

    if (filesize >= 1073741824) {
        return (filesize / 1073741824).toFixed(2) + " GB";
    } else if (filesize >= 1048576) {
        return (filesize / 1048576).toFixed(2) + " MB";
    } else if (filesize >= 1024) {
        return (filesize / 1024).toFixed(2) + " KB";
    } else {
        return filesize + " bytes";
    }
}
