/* eslint-disable no-unused-vars */
declare namespace ig {
	export const game: Game;

	export class Class {
		public parent(...args: any[]): any;
	}
	export class Track {
		public constructor(path: string, loopEnd: number, introPath?: string, introEnd?: number, baseVolume?: number);
	
		public loop: boolean;
		public loopEnd: number;
		public endCallback: () => void;

		public play(): void;
		public pause(): void;
		public reset(): void;
	}
	
	export class Game {
		public mapName: string;
	}

	export namespace EVENT_STEP {

		export class SHOW_MSG extends ig.Class {
			public static inject(overwrites: {
				start(): void,
			}): void

			public message: Message
		}
		export class SHOW_SIDE_MSG extends ig.Class {
			public static inject(overwrites: {
				start(): void,
			}): void

			public message: Message
		}
	}

}

declare namespace sc {
	export class TextGui extends ig.Class {
		public static inject(overwrites: {
			update(): void,
		}): void

		protected beepSound?: {play(): void}
	}

	export class MessageModel extends ig.Class {
		public static inject(overwrites: {
			getNextSideMessage(): MessageData,
			parent?: () => MessageData,
		}): void
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