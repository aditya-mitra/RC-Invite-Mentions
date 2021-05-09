import { ISetting, SettingType } from "@rocket.chat/apps-engine/definition/settings";


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

export const settings: Array<ISetting> = [
    {
        id: AppSetting.ApplyMentionsToPublicRooms,
        public: true,
        type: SettingType.BOOLEAN,
        packageValue: '',
        i18nLabel: 'apply_mentions_to_public_room',
        required: true,
    },
    {
        id: AppSetting.ApplyMentionsToPrivateRooms,
        public: true,
        type: SettingType.BOOLEAN,
        packageValue: '',
        i18nLabel: 'apply_mentions_to_private_room',
        required: true,
    },
    {
        id: AppSetting.IncludeChannels,
        public: true,
        type: SettingType.STRING,
        packageValue: '',
        i18nLabel: 'include_channels',
        required: true,
    },
    {
        id: AppSetting.ExcludeChannels,
        public: true,
        type: SettingType.STRING,
        packageValue: '',
        i18nLabel: 'exclude_channels',
        required: true,
    },
    {
        id: AppSetting.ApplyMentionsToDiscussions,
        public: true,
        type: SettingType.BOOLEAN,
        packageValue: '',
        i18nLabel: 'apply_mentions_to_discussions',
        required: true,
    },
    {
        id: AppSetting.ApplyMentionsToThreads,
        public: true,
        type: SettingType.BOOLEAN,
        packageValue: '',
        i18nLabel: 'apply_mentions_to_threads',
        required: true,
    },
    {
        id: AppSetting.AllowRoomOwnersToEditSettingsForTheirRooms,
        public: true,
        type: SettingType.BOOLEAN,
        packageValue: '',
        i18nLabel: 'allow_room_owners_to_edit_settings_for_their_rooms',
        required: true,
    },
    {
        id: AppSetting.AskConfirmationBeforeAddingToRooms,
        public: true,
        type: SettingType.BOOLEAN,
        packageValue: '',
        i18nLabel: 'ask_confirmation_before_adding_to_rooms',
        required: true,
    },
    {
        id: AppSetting.AllowUsersToAddUsingMentions,
        public: true,
        type: SettingType.BOOLEAN,
        packageValue: '',
        i18nLabel: 'allow_users_to_add_using_mentions',
        required: true,
    },
]