import { IAppAccessors, IConfigurationExtend, ILogger, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IMessage, IPostMessageSent } from '@rocket.chat/apps-engine/definition/messages';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { settings } from './src/config/Settings';
import TestCommand from './src/config/SlashCommands';
import { PostMessageSentHandler } from './src/handlers/PostMessageSentHandler'
export default class InviteMentionsApp extends App implements IPostMessageSent {
	constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

	async executePostMessageSent(
		message: IMessage,
		read: IRead
	): Promise<void> {
		const postMessageHandler = new PostMessageSentHandler(this, message, read);
		postMessageHandler.run();
	}

	protected async extendConfiguration(configuration: IConfigurationExtend): Promise<void> {
		await Promise.all(
			settings.map((setting) => configuration.settings.provideSetting(setting))
		);
		await configuration.slashCommands.provideSlashCommand(new TestCommand());
	}
}
