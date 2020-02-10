export default class TrackManager {
    
    /**
     * 
     * @param {string} path to track config file
     */
    constructor(path) {
        this.path = path;
        this.data = null;
    }

    async init() {
        if (!await this.loadConfig()) {
            throw Error('Failed to load config file.');
        }
    }

    async loadConfig() {
        try {
            this.data = JSON.parse(await fetch(this.path));
        } catch(e) {
            console.error(e);
            return false;
        }
        return true;
    }
}