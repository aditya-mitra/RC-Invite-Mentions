import { IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { IApp } from '@rocket.chat/apps-engine/definition/IApp';
import { IMessage } from '@rocket.chat/apps-engine/definition/messages';

import SendInviteMessage from '../lib/sendInviteMessage';

export default class PostMessageSentHandler {
	private roomMemberUsernames: string[] = [];

	constructor(
		private _app: IApp,
		private message: IMessage,
		private read: IRead,
		private modify: IModify
	) {
		this.message = message;
	}

	/** send message to the user only if not in room */
	private async sendMessageToUser(username: string): Promise<void> {
		const user = await this.read.getUserReader().getByUsername(username);
		if (user && !this.roomMemberUsernames.includes(user.username)) {
			new SendInviteMessage({
				mentionedUser: user,
				receivingUser: this.message.sender,
				block: this.modify.getCreator().getBlockBuilder(),
				notify: this.modify.getNotifier(),
				room: this.message.room,
				threadId: this.message.threadId
			}).sendMessage();
		}
	}

	public async run(): Promise<void> {
		const messageText = this.message.text || '';

		const roomMembers = await this.read.getRoomReader().getMembers(this.message.room.id);
		this.roomMemberUsernames = roomMembers.map((roomMember) => roomMember.username);

		const mentionsRegex = new RegExp('@(?:[a-zA-Z0-9_.-]+)', 'gim');

		const matchedUsernames = messageText.match(mentionsRegex)?.map((match) => match.slice(1));
		if (!matchedUsernames || matchedUsernames.length === 0) {
			return;
		}

		await Promise.all(matchedUsernames.map((username) => this.sendMessageToUser(username)))
			// TODO: refactor `this console error into `app's logging`
			.catch((e) => console.log(e)); // eslint-disable-line no-console
	}
}
