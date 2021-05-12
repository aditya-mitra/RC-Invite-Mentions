import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { IUser } from '@rocket.chat/apps-engine/definition/users';
import {
	IUIKitResponse,
	UIKitBlockInteractionContext
} from '@rocket.chat/apps-engine/definition/uikit';

import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import { inviteMessageActions } from '../utils/enums';

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
		const updater = this.modify.getUpdater();

		const roomBuilder = (
			await updater.room(this.contextRoom.id, this.contextUser)
		).addMemberToBeAddedByUsername(username);

		await updater.finish(roomBuilder);
	}

	public async handleBlockAction(): Promise<IUIKitResponse> {
		const { ctx, contextRoom } = this;

		const { value, actionId } = ctx.getInteractionData();

		if (actionId === inviteMessageActions.addUser && !!value && !!contextRoom) {
			await this.addUserToRoom(value);
			return { success: true };
		}

		return { success: false };
	}
}
