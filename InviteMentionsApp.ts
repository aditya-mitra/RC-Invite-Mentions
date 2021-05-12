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
	IUIKitResponse,
	UIKitBlockInteractionContext
} from '@rocket.chat/apps-engine/definition/uikit';

import settings from './src/config/Settings';
import TestCommand from './src/config/SlashCommands';
import BlockActionHandler from './src/handlers/BlockActionHandler';
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
	): Promise<IUIKitResponse> {
		return new BlockActionHandler(ctx, read, http, persist, modify).handleBlockAction();
	}

	protected async extendConfiguration(configuration: IConfigurationExtend): Promise<void> {
		await Promise.all(
			settings.map((setting) => configuration.settings.provideSetting(setting))
		);
		await configuration.slashCommands.provideSlashCommand(new TestCommand());
	}
}
