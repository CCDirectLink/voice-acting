import { Track } from './track.js';
import { Beep } from './beep.js';
import { Hooks } from './hooks.js';

import fetchType from 'node-fetch';
declare const fetch: typeof fetchType;

export default class VoiceActing extends Plugin {
	private modPath: string;
	private soundsPath: string;
	private beep!: Beep

	private maps = new Map<string, Map<number, Track>>();

	constructor(mod: Mod) {
		super(mod);
		
		this.modPath = mod.baseDirectory.substr(7);
		this.soundsPath = this.modPath + 'sounds/';
	}

	async prestart() {
		this.beep = new Beep();
		Hooks.hook(msg => this.onMessage(msg));
		await this.prepareTracks();
	}

	private async prepareTracks() {
		const resp = await fetch(this.modPath + 'fileTable.json');
		const files = await resp.json() as FileTable;
		for (const map in files) {
			const tracks = files[map].tracks;
			const mapTracks = new Map<number, Track>();
			for (let i = 0; i < tracks.length; i++) {
				const data = tracks[i];
				if (data.path.startsWith('./')) {
					data.path = this.soundsPath + data.path.substr(2);
				}
				const track = new Track(data.path, data.pauses, (t) => this.onPause(t), () => this.onEnd());
				track.load();
				mapTracks.set(i, track);
			}
			this.maps.set(map, mapTracks);
		}
	}

	private onEnd() {
		console.log('end');
		this.beep.enable();
	}

	private onPause(track: Track) {
		console.log('pause', track);
	}

	private onMessage(message: Message): void {
		const map = ig.game.mapName;
		const id = message.data.langUid;
		if(!this.maps.has(map))
			return console.warn('Map not found in script: ', map);

		const track = this.maps.get(map)!.get(Number(id));
		if(!track)
			return console.warn('Line not found in script: ', map, id);

		this.beep.disable();
		track.play();
	}
}

interface Message {
	data: {
		en_US: string;
		langUid: string;
	}
}

interface MessageData {
	message: Message;	
}