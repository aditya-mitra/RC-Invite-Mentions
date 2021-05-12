import {
	IConfigurationExtend,
	IHttp,
	IModify,
	IPersistence,
	IRead
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IMessage, IPostMessageSent } from '@rocket.chat/apps-engine/definition/messages';
import {
	IUIKitInteractionHandler,
	UIKitBlockInteractionContext
} from '@rocket.chat/apps-engine/definition/uikit';

import settings from './src/config/Settings';
import TestCommand from './src/config/SlashCommands';
import handleBlockAction from './src/handlers/BlockActionHandler';
import PostMessageSentHandler from './src/handlers/PostMessageSentHandler';

export default class InviteMentionsApp
	extends App
	implements IPostMessageSent, IUIKitInteractionHandler {
	async executePostMessageSent(
		message: IMessage,
		read: IRead,
		http: IHttp,
		persistence: IPersistence,
		modify: IModify
	): Promise<void> {
		const postMessageHandler = new PostMessageSentHandler(this, message, read, modify);
		postMessageHandler.run();
	}

	async executeBlockActionHandler(
		ctx: UIKitBlockInteractionContext,
		read: IRead,
		http: IHttp,
		persist: IPersistence,
		modify: IModify
	) {
		return handleBlockAction(ctx, read, http, persist, modify);
	}

	protected async extendConfiguration(configuration: IConfigurationExtend): Promise<void> {
		await Promise.all(
			settings.map((setting) => configuration.settings.provideSetting(setting))
		);
		await configuration.slashCommands.provideSlashCommand(new TestCommand());
	}
}
