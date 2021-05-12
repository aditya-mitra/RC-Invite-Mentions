import { IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { IApp } from '@rocket.chat/apps-engine/definition/IApp';
import { IMessage } from '@rocket.chat/apps-engine/definition/messages';
import SendInviteMessage from '../lib/sendInviteMessage';

export default class PostMessageSentHandler {
	constructor(
		private app: IApp,
		private message: IMessage,
		private read: IRead,
		private modify: IModify
	) {
		this.message = message;
	}

	public async run(): Promise<void> {
		const messageText = this.message.text || '';
		const { sender, room } = this.message;
		const roomMembers = await this.read.getRoomReader().getMembers(room.id);
		const roomMemberUserNames = roomMembers.map((roomMember) => roomMember.username);
		const mentionsRegex = new RegExp('@([a-zA-Z0-9_.]+)', 'gim');
		let allMentions = messageText.match(mentionsRegex);
		if (allMentions && allMentions.length) {
			allMentions = allMentions.map((match) => match.slice(1));
			allMentions.map(async (userName) => {
				const user = await this.read.getUserReader().getByUsername(userName);
				if (roomMemberUserNames.includes(user.username) === false) {
					new SendInviteMessage({
						mentionedUser: user,
						receivingUser: sender,
						block: this.modify.getCreator().getBlockBuilder(),
						notify: this.modify.getNotifier(),
						room
					}).sendMessage();
				}
			});
		}
	}
}
