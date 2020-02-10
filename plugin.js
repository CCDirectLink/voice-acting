
import TrackManager from './track-manager.js';

export default class VoiceActing extends Plugin {
    constructor(mod) {
        super(mod);
        this.mod = mod;
    }

    async preload() {
        // expose trackManager to the world
        this.trackManager = window.trackManager = new TrackManager;
    }

    async postload() {

    }
}