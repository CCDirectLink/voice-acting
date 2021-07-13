export class Beep {
	private enabled = true;

	constructor() {
		this.inject();
	}

	private inject() {
		const instance = this;
		sc.TextGui.inject({
			update: function(this: sc.TextGui) {
				if (instance.enabled) {
					this.parent();
				} else {
					const original = this.beepSound;
					this.beepSound = undefined;
					this.parent();
					this.beepSound = original;
				}
			}
		});
	}

	public enable() {
		this.enabled = true;
	}

	public disable() {
		this.enabled = false;
	}
}