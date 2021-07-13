interface FileTable {
    [map: string]: {
        tracks: {
            path: string,
            pauses: number[]
        }[],
        lines: {
            [number: string]: number
        }
    }
}