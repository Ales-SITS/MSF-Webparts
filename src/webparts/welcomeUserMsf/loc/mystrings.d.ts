declare interface IWelcomeUserMsfWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
}

declare module 'WelcomeUserMsfWebPartStrings' {
  const strings: IWelcomeUserMsfWebPartStrings;
  export = strings;
}
