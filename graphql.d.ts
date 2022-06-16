/* eslint-disable */
/**
 * Important note! This file is auto-generated using graphql-codegen.
 *
 * Note for Local Team: this can be manually regenerated using `nps types.graphqlCodegen`. It is worth noting that the
 * aforementioned script will be ran as part of all of the `nps build` scripts.
 */
declare module '@getflywheel/local/graphql' {

import { MultiSite } from '@getflywheel/local';
import { SiteServiceType } from '@getflywheel/local';
import { SiteServiceRole } from '@getflywheel/local';
import { HostId } from '@getflywheel/local';
export type Maybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  EpochTimestamp: any;
  JSON: any;
};

export type AddSiteInput = {
  blueprint?: Maybe<Scalars['String']>;
  database?: Maybe<Scalars['String']>;
  domain: Scalars['String'];
  environment?: Maybe<SiteEnvironment>;
  goToSite?: Maybe<Scalars['Boolean']>;
  multiSite?: Maybe<MultiSite>;
  name: Scalars['String'];
  path: Scalars['String'];
  phpVersion?: Maybe<Scalars['String']>;
  skipWPInstall?: Maybe<Scalars['Boolean']>;
  webServer?: Maybe<Scalars['String']>;
  wpAdminEmail?: Maybe<Scalars['String']>;
  wpAdminPassword?: Maybe<Scalars['String']>;
  wpAdminUsername?: Maybe<Scalars['String']>;
};


export type HostConnection = {
  accountId?: Maybe<Scalars['String']>;
  hostId?: Maybe<HostId>;
  remoteSiteEnv?: Maybe<Scalars['JSON']>;
  remoteSiteId?: Maybe<Scalars['String']>;
};

export { HostId };

export type Job = {
  error?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  logs?: Maybe<Scalars['String']>;
  status: JobStatus;
};

export type JobStatus = 
  | 'created'
  | 'failed'
  | 'running'
  | 'successful';


export { MultiSite };

export type Mutation = {
  /** Placeholder field so the schema can be extended. */
  _empty?: Maybe<Scalars['String']>;
  addSite?: Maybe<Job>;
  /** Stop and then start services for the specified site. */
  restartSite?: Maybe<Site>;
  /** Stop and then start services for the specified sites. */
  restartSites?: Maybe<Array<Maybe<Site>>>;
  /** Star a site. */
  starSite?: Maybe<Site>;
  /** Start Live Link Pro for the specified site. */
  startLiveLink?: Maybe<SiteLiveLinkSettings>;
  /** Start services for the specified site. */
  startSite?: Maybe<Site>;
  /** Start services for the specified sites. */
  startSites?: Maybe<Array<Maybe<Site>>>;
  /** Stops all running sites. */
  stopAllSites?: Maybe<Scalars['Boolean']>;
  /** Stop Live Link Pro for the specified site. */
  stopLiveLink?: Maybe<SiteLiveLinkSettings>;
  /** Stop services for the specified site. Note, this will also handle dumping the site database. */
  stopSite?: Maybe<Site>;
  /** Toggle whether or not to sort sites by last started in the sidebar. */
  toggleSortSitesByLastStarted?: Maybe<Scalars['Boolean']>;
  /** Unstar a site. */
  unstarSite?: Maybe<Site>;
  updateSite?: Maybe<Site>;
  upgradeLightningService?: Maybe<Job>;
};


export type MutationAddSiteArgs = {
  input?: Maybe<AddSiteInput>;
};


export type MutationRestartSiteArgs = {
  id: Scalars['ID'];
};


export type MutationRestartSitesArgs = {
  ids: Array<Maybe<Scalars['ID']>>;
};


export type MutationStarSiteArgs = {
  id: Scalars['ID'];
};


export type MutationStartLiveLinkArgs = {
  id: Scalars['ID'];
};


export type MutationStartSiteArgs = {
  id: Scalars['ID'];
};


export type MutationStartSitesArgs = {
  ids: Array<Maybe<Scalars['ID']>>;
};


export type MutationStopLiveLinkArgs = {
  id: Scalars['ID'];
};


export type MutationStopSiteArgs = {
  id: Scalars['ID'];
};


export type MutationToggleSortSitesByLastStartedArgs = {
  sortByLastStarted: Scalars['Boolean'];
};


export type MutationUnstarSiteArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateSiteArgs = {
  id: Scalars['ID'];
  sitePartial?: Maybe<Scalars['JSON']>;
};


export type MutationUpgradeLightningServiceArgs = {
  service?: Maybe<Scalars['String']>;
  serviceBinVersion?: Maybe<Scalars['String']>;
};

export type Query = {
  /** Placeholder field so the schema can be extended. */
  _empty?: Maybe<Scalars['String']>;
  getFeaturesArray?: Maybe<Scalars['JSON']>;
  isFeatureEnabled?: Maybe<Scalars['Boolean']>;
  isUpdateAvailable?: Maybe<Scalars['JSON']>;
  job?: Maybe<Job>;
  jobs?: Maybe<Array<Maybe<Job>>>;
  site?: Maybe<Site>;
  sites?: Maybe<Array<Maybe<Site>>>;
  /** Determine whether or not the site's sidebar should be sorted by the time's sites were last started. */
  sortSitesByLastStarted?: Maybe<Scalars['Boolean']>;
};


export type QueryIsFeatureEnabledArgs = {
  featureName: Scalars['String'];
};


export type QueryIsUpdateAvailableArgs = {
  service?: Maybe<Scalars['String']>;
  serviceBinVersion?: Maybe<Scalars['String']>;
};


export type QueryJobArgs = {
  id: Scalars['ID'];
};


export type QuerySiteArgs = {
  id: Scalars['ID'];
};

export type Site = {
  domain: Scalars['String'];
  host: Scalars['String'];
  hostConnections?: Maybe<Array<Maybe<HostConnection>>>;
  httpPort?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  isStarred?: Maybe<Scalars['Boolean']>;
  liveLinkSettings?: Maybe<SiteLiveLinkSettings>;
  localVersion?: Maybe<Scalars['String']>;
  longPath: Scalars['String'];
  multiSite?: Maybe<MultiSite>;
  multiSiteDomains?: Maybe<Array<Maybe<Scalars['String']>>>;
  mysql?: Maybe<SiteMySqlInfo>;
  name: Scalars['String'];
  oneClickAdminDisplayName?: Maybe<Scalars['String']>;
  oneClickAdminID?: Maybe<Scalars['Int']>;
  path: Scalars['String'];
  paths: SitePaths;
  services?: Maybe<Array<Maybe<SiteService>>>;
  siteLastStartedTimestamp?: Maybe<Scalars['EpochTimestamp']>;
  status: SiteStatus;
  url: Scalars['String'];
  workspace?: Maybe<Scalars['String']>;
};

export type SiteEnvironment = 
  | 'custom'
  | 'preferred';

export type SiteLiveLinkSettings = {
  basicAuthPassword?: Maybe<Scalars['String']>;
  basicAuthUsername?: Maybe<Scalars['String']>;
  subdomain?: Maybe<Scalars['String']>;
};

export type SiteMySqlInfo = {
  database?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
};

export type SitePaths = {
  app?: Maybe<Scalars['String']>;
  conf?: Maybe<Scalars['String']>;
  confTemplates?: Maybe<Scalars['String']>;
  logs?: Maybe<Scalars['String']>;
  runData?: Maybe<Scalars['String']>;
  sql?: Maybe<Scalars['String']>;
  webRoot?: Maybe<Scalars['String']>;
};

export type SiteService = {
  name: Scalars['String'];
  ports?: Maybe<Scalars['JSON']>;
  role?: Maybe<SiteServiceRole>;
  type?: Maybe<SiteServiceType>;
  version: Scalars['String'];
};

export { SiteServiceRole };

export { SiteServiceType };

export type SiteStatus = 
  | 'adding'
  | 'backing_up'
  | 'cloning'
  | 'container_missing'
  | 'copying'
  | 'creating'
  | 'deleting'
  | 'exporting'
  | 'exporting_db'
  | 'halted'
  | 'processing'
  | 'provisioning'
  | 'provisioning_error'
  | 'pulling'
  | 'pulling_finalizing'
  | 'pulling_provisioning'
  | 'pulling_request_backup'
  | 'pushing'
  | 'pushing_preparing'
  | 'pushing_processing'
  | 'pushing_v2'
  | 'restarting'
  | 'restoring_backup'
  | 'running'
  | 'saving'
  | 'starting'
  | 'stopping'
  | 'updating_wp'
  | 'wordpress_install_error';

export type Subscription = {
  /** Placeholder field so the schema can be extended. */
  _empty?: Maybe<Scalars['String']>;
  siteStatusChanged?: Maybe<Site>;
  sitesUpdated?: Maybe<Array<Maybe<Site>>>;
  siteUpdated?: Maybe<Site>;
};


export type SubscriptionSiteUpdatedArgs = {
  id?: Maybe<Scalars['ID']>;
};

}