import { IConfigurationExtend } from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';

import { settings } from './src/config/Settings';
import TestCommand from './src/config/SlashCommands';

export default class InviteMentionsApp extends App {
	protected async extendConfiguration(configuration: IConfigurationExtend): Promise<void> {
		await Promise.all(
			settings.map((setting) => configuration.settings.provideSetting(setting))
		);
		await configuration.slashCommands.provideSlashCommand(new TestCommand());
	}
}
