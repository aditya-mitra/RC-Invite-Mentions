import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import {
	ISlashCommand,
	SlashCommandContext
} from '@rocket.chat/apps-engine/definition/slashcommands';
import { IUser } from '@rocket.chat/apps-engine/definition/users';

import SendInviteMessage from '../lib/sendInviteMessage';

export default class TestCommand implements ISlashCommand {
	public command = 'test-invite-app';

	public i18nDescription = 'only there for testing';

	public i18nParamsExample = '';

	public providesPreview = false;

	public async executor(
		ctx: SlashCommandContext,
		read: IRead,
		modify: IModify,
		http: IHttp,
		persist: IPersistence
	): Promise<void> {
		const choice = ctx.getArguments()[0];

		const testUser = {
			username: 'my-invite-test-user',
            name: 'MyInvite TestUser'
		} as IUser;

		const sendInvite = new SendInviteMessage({
			mentionedUser: testUser,
			receivingUser: ctx.getSender(),
			block: modify.getCreator().getBlockBuilder(),
			notify: modify.getNotifier(),
			room: ctx.getRoom(),
			threadId: ctx.getThreadId()
		});

        sendInvite.sendMessage();
	}
}
