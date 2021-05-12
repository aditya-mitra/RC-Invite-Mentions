import {
	IHttp,
	IModify,
	IModifyUpdater,
	IPersistence,
	IRead
} from '@rocket.chat/apps-engine/definition/accessors';
import { IUser } from '@rocket.chat/apps-engine/definition/users';
import {
	IUIKitResponse,
	UIKitBlockInteractionContext
} from '@rocket.chat/apps-engine/definition/uikit';

import { inviteMessageActions } from '../utils/enums';
import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';

export default class BlockActionHandler {
	private contextUser: IUser;
	private contextRoom: IRoom;
	private modify: IModify;
	private ctx: UIKitBlockInteractionContext;

	constructor(
		ctx: UIKitBlockInteractionContext,
		read: IRead,
		_http: IHttp,
		_persist: IPersistence,
		modify: IModify
	) {
		this.ctx = ctx;
		this.modify = modify;
		this.contextUser = ctx.getInteractionData().user;

		const contextRoom = ctx.getInteractionData().room;
		if (contextRoom) {
			this.contextRoom = contextRoom;
		}
	}

	private async addUserToRoom(username: string): Promise<void> {
		console.log('came here', username, this.contextRoom.id, this.contextUser.username);

		const updater = this.modify.getUpdater();

		const roomBuilder = await updater.room(this.contextRoom.id, this.contextUser);
		roomBuilder.addMemberToBeAddedByUsername(username);

		await updater.finish(roomBuilder);
	}

	private async updateMessage() {}

	public async handleBlockAction(): Promise<IUIKitResponse> {
		const { ctx, contextRoom, addUserToRoom } = this;

		const { value, actionId } = ctx.getInteractionData();

		if (actionId === inviteMessageActions.addUser && !!value && !!contextRoom) {
			await this.addUserToRoom(value);
			return { success: true };
		}
		console.log('failder');
		return { success: false };
	}
}
