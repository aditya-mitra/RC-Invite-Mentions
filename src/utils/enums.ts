/* eslint-disable */
export enum inviteMessageActions {
	addUser = 'add_user_to_room',
	doNothing = 'do_nothing'
}

export enum AppSetting {
	ApplyMentionsToPublicRooms = 'apply_mentions_to_public_room',
	ApplyMentionsToPrivateRooms = 'apply_mentions_to_private_room',
	IncludeChannels = 'include_channels',
	ExcludeChannels = 'exclude_channels',
	ApplyMentionsToDiscussions = 'apply_mentions_to_discussions',
	ApplyMentionsToThreads = 'apply_mentions_to_threads',
	AllowRoomOwnersToEditSettingsForTheirRooms = 'allow_room_owners_to_edit_settings_for_their_rooms',
	AskConfirmationBeforeAddingToRooms = 'ask_confirmation_before_adding_to_rooms',
	AllowUsersToAddUsingMentions = 'allow_users_to_add_using_mentions'
}
