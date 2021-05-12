import { IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { IApp } from '@rocket.chat/apps-engine/definition/IApp';
import { IMessage } from '@rocket.chat/apps-engine/definition/messages';

export class PostMessageSentHandler {
	constructor(private app: IApp, private message: IMessage, private read: IRead) {}

	public async run() {
		const messageText = this.message.text || '';
		var mentionsRegex = new RegExp('@([a-zA-Z0-9\_\.]+)', 'gim');
		var allMentions = messageText.match(mentionsRegex);
		if (allMentions && allMentions.length) {
			allMentions = allMentions.map((match)=> match.slice(1));
			allMentions.map((userName) => {
				this.read.getUserReader().getByUsername(userName).then((res) => console.log("details", res))
			})
		}
		this.app.getLogger().debug("testing" , allMentions ? allMentions : 'Null') // If NULL is given to LOGS app crashed so checking
	}
}
