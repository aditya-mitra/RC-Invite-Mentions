import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import {
	IUIKitResponse,
	UIKitBlockInteractionContext
} from '@rocket.chat/apps-engine/definition/uikit';
import { inviteMessageActions } from '../utils/enums';

export default async function handleBlockAction(
	ctx: UIKitBlockInteractionContext,
	read: IRead,
	http: IHttp,
	persist: IPersistence,
	modify: IModify
): Promise<IUIKitResponse> {
	const { value, user, room, actionId } = ctx.getInteractionData();

	if (actionId !== inviteMessageActions.addUser || !value || !room) {
		return { success: false };
	}

	const updater = modify.getUpdater();

	const roomBuilder = await updater.room(room.id, user);

	roomBuilder.addMemberToBeAddedByUsername(value);

	await updater.finish(roomBuilder);

	return { success: true };
}
