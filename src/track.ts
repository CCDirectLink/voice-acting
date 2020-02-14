const path = require('path');

export class Track {
	public readonly path: string;
	public readonly pauses: number[];
	private readonly onPause: (track: Track) => void;
	private readonly onEnd: () => void;

	
	private instance!: ig.Track;
	private nextPause = 1;

	constructor(
		path: string,
		pauses: number[],
		onPause: (track: Track) => void,
		onEnd: () => void,
	) {
		this.path = this.normalize(path);
		
		if (pauses.length === 0) {
			pauses.push(0);
		}
		this.pauses = pauses;

		this.onPause = onPause;
		this.onEnd = onEnd;
	}
	
	public load() {
		this.instance = new ig.Track(this.path, this.pauses[0]);
		this.instance.loop = false;
		this.instance.endCallback = () => this.endCallback();
	}

	public play() {
		this.instance.play();
	}

	private normalize(original: string) {
		return path.normalize(original);
	}

	private endCallback() {
		const next = this.pauses[this.nextPause++];
		if (next) {
			this.instance.pause();
			this.instance.loopEnd = next;
			this.onPause(this);
		} else {
			this.onEnd();
		}
	}
}