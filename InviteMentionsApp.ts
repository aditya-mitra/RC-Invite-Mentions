import { IConfigurationExtend } from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { settings } from './src/config/Settings';

export default class InviteMentionsApp extends App {
	protected async extendConfiguration(configuration: IConfigurationExtend): Promise<void> {
		await Promise.all(
			settings.map((setting) => configuration.settings.provideSetting(setting))
		);
	}
}
