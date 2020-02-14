export class Hooks {
	private static messageStack: Message[] = [];

	public static hook(callback: (message: Message) => void): void {
		ig.EVENT_STEP.SHOW_MSG.inject({
			start: function(this: ig.EVENT_STEP.SHOW_MSG) {
				this.parent();
				callback(this.message);
			}
		});


		ig.EVENT_STEP.SHOW_SIDE_MSG.inject({
			start: function(this: ig.EVENT_STEP.SHOW_MSG) {
				this.parent();
				Hooks.messageStack.push(this.message);
			}
		});
		sc.MessageModel.inject({
			getNextSideMessage: function(this: sc.MessageModel): MessageData {
				const result = this.parent() as MessageData;

				let index = Hooks.findMsgIndex(result);
				if (index >= 0) {
					callback(Hooks.messageStack[index]);
					while (index >= 0) {
						Hooks.messageStack.splice(index, 1);
						index = Hooks.findMsgIndex(result);
					}
				}

				return result;
			}
		});
	}
	
	private static findMsgIndex(newMessage: MessageData) {
		return Hooks.messageStack.findIndex(msg => msg.data.en_US === newMessage.message.data.en_US);
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