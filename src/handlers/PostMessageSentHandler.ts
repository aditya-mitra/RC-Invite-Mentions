import { IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { IApp } from '@rocket.chat/apps-engine/definition/IApp';
import { IMessage } from '@rocket.chat/apps-engine/definition/messages';
import SendInviteMessage from '../lib/sendInviteMessage';

export class PostMessageSentHandler {
	constructor(
		private app: IApp,
		private message: IMessage,
		private read: IRead,
		private modify: IModify
	) {}

	public async run() {
		const messageText = this.message.text || '';
		const sender = this.message.sender;
		const room = this.message.room;
		var roomMembers = await this.read.getRoomReader().getMembers(room.id);
		const roomMemberUserNames = roomMembers.map((roomMember) => roomMember.username);
		var mentionsRegex = new RegExp('@([a-zA-Z0-9_.]+)', 'gim');
		var allMentions = messageText.match(mentionsRegex);
		if (allMentions && allMentions.length) {
			allMentions = allMentions.map((match) => match.slice(1));
			allMentions.map(async (userName) => {
				let user = await this.read.getUserReader().getByUsername(userName);
				if (roomMemberUserNames.includes(user.username) === false) {
					console.log('User Not in Room', user.username);
					const sendInvite = new SendInviteMessage({
						mentionedUser: user,
						receivingUser: sender,
						block: this.modify.getCreator().getBlockBuilder(),
						notify: this.modify.getNotifier(),
						room: room
					});
					sendInvite.sendMessage();
				}
			});
		}
	}
}
