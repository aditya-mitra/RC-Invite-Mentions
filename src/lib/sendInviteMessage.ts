import { INotifier } from '@rocket.chat/apps-engine/definition/accessors';
import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import { BlockBuilder, ButtonStyle } from '@rocket.chat/apps-engine/definition/uikit';
import { IUser } from '@rocket.chat/apps-engine/definition/users';

import { inviteMessageActions } from '../utils/enums';

interface ISendInviteMessageArgs {
	notify: INotifier;
	room: IRoom;
	receivingUser: IUser;
	mentionedUser: IUser;
	threadId?: string;
	block: BlockBuilder;
}

export default class SendInviteMessage {
	private mentionedUser: IUser;
	private block: BlockBuilder;
	private recevingUser: IUser;
	private notify: INotifier;
	private room: IRoom;
	private threadId: string;

	constructor({
		mentionedUser,
		block,
		notify,
		receivingUser,
		room,
		threadId
	}: ISendInviteMessageArgs) {
		this.mentionedUser = mentionedUser;
		this.block = block;
		this.notify = notify;
		this.recevingUser = receivingUser;
		this.room = room;
		if (threadId) {
			this.threadId = threadId;
		}
	}

	private setText() {
		const { block } = this;
		block.addSectionBlock({
			text: block.newMarkdownTextObject(`The mentioned user **${this.mentionedUser.name}** is not present in this room.
    __What would you like to do?__`)
		});
	}

	private setButtons() {
		const { block } = this;
		block.addActionsBlock({
			elements: [
				block.newButtonElement({
					text: block.newPlainTextObject('Add User To Room'),
					actionId: inviteMessageActions.addUser,
					value: this.mentionedUser.username,
					style: ButtonStyle.PRIMARY
				}),
				block.newButtonElement({
					text: block.newPlainTextObject('Do Nothing'),
					actionId: inviteMessageActions.doNothing
				})
			]
		});
	}

	public async sendMessage() {
		const builder = this.notify.getMessageBuilder();

		builder
			.setAvatarUrl(
				'https://res.cloudinary.com/gamersinstinct7/image/upload/v1620666920/rc/at.png'
			)
			.setRoom(this.room)
            .setSender(this.recevingUser)
            .setUsernameAlias("Mentions")

		if (this.threadId) {
			builder.setThreadId(this.threadId);
		}

		this.setText();
		this.setButtons();

        builder.setBlocks(this.block.getBlocks());

		await this.notify.notifyUser(this.recevingUser, builder.getMessage());
	}
}
