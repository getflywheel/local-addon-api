/* eslint-disable */
/**
 * Important note! This file is auto-generated using graphql-codegen.
 *
 * Note for Local Team: this can be manually regenerated using `nps types.graphqlCodegen`. It is worth noting that the
 * aforementioned script will be ran as part of all of the `nps build` scripts.
 */
declare module '@getflywheel/local/graphql' {

export type InputMaybe<T> = Maybe<T>;

import { MultiSite } from '@getflywheel/local';
import { SiteServiceType } from '@getflywheel/local';
import { SiteServiceRole } from '@getflywheel/local';
import { HostId } from '@getflywheel/local';
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  goToSite?: Scalars['Boolean'];
  multiSite?: Maybe<MultiSite>;
  name: Scalars['String'];
  path: Scalars['String'];
  phpVersion?: Maybe<Scalars['String']>;
  skipWPInstall?: Maybe<Scalars['Boolean']>;
  webServer?: Maybe<Scalars['String']>;
  wpAdminEmail: Scalars['String'];
  wpAdminPassword: Scalars['String'];
  wpAdminUsername: Scalars['String'];
  xdebugEnabled?: Maybe<Scalars['Boolean']>;
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
  /** Create a site group. */
  createSiteGroup: SiteGroup;
  /** Delete a site group. All sites will be moved to default 'Sites' group. */
  deleteSiteGroup: SiteGroup;
  /** Delete sites from groups (i.e. remove a site from .json) */
  deleteSitesFromGroups: Array<SiteGroup>;
  /** Move a site group to an index. Other groups' indices may be affected, and those groups returned. */
  moveGroupToIndex: Array<SiteGroup>;
  /** Move sites to a group (can also add a site to .json) */
  moveSitesToGroup: Array<SiteGroup>;
  renameSite?: Maybe<Site>;
  /** Rename a site group. */
  renameSiteGroup: SiteGroup;
  /** Stop and then start services for the specified site. */
  restartSite?: Maybe<Site>;
  /** Stop and then start services for the specified sites. */
  restartSites?: Maybe<Array<Maybe<Site>>>;
  /** Set explicit open state for a group. Defaults to false, or closed. */
  setGroupOpen: SiteGroup;
  /** Set explicit open state for the sites sidebar */
  setSidebarCollapsed: Scalars['Boolean'];
  /** Set the value for sorting sites by last started timestamp. */
  setSortSitesByLastStarted: Scalars['Boolean'];
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
  updateSite?: Maybe<Site>;
  upgradeLightningService?: Maybe<Job>;
};


export type MutationAddSiteArgs = {
  input: AddSiteInput;
};


export type MutationCreateSiteGroupArgs = {
  index?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  open?: Maybe<Scalars['Boolean']>;
  siteIds?: Maybe<Array<Scalars['String']>>;
};


export type MutationDeleteSiteGroupArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteSitesFromGroupsArgs = {
  siteIds: Array<Scalars['String']>;
};


export type MutationMoveGroupToIndexArgs = {
  id: Scalars['ID'];
  index: Scalars['Int'];
};


export type MutationMoveSitesToGroupArgs = {
  id: Scalars['ID'];
  siteIds: Array<Scalars['String']>;
};


export type MutationRenameSiteArgs = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type MutationRenameSiteGroupArgs = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type MutationRestartSiteArgs = {
  id: Scalars['ID'];
};


export type MutationRestartSitesArgs = {
  ids: Array<Maybe<Scalars['ID']>>;
};


export type MutationSetGroupOpenArgs = {
  id: Scalars['ID'];
  open?: Maybe<Scalars['Boolean']>;
};


export type MutationSetSidebarCollapsedArgs = {
  sidebarCollapsed: Scalars['Boolean'];
};


export type MutationSetSortSitesByLastStartedArgs = {
  sortSitesByLastStarted: Scalars['Boolean'];
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


export type MutationUpdateSiteArgs = {
  id: Scalars['ID'];
  sitePartial?: Maybe<Scalars['JSON']>;
};


export type MutationUpgradeLightningServiceArgs = {
  newBinVersion: Scalars['String'];
  oldBinVersion: Scalars['String'];
  service: Scalars['String'];
};

export type Query = {
  /** Placeholder field so the schema can be extended. */
  _empty?: Maybe<Scalars['String']>;
  getFeaturesArray?: Maybe<Scalars['JSON']>;
  isFeatureEnabled?: Maybe<Scalars['Boolean']>;
  isUpdateAvailable: ServiceUpdateData;
  job?: Maybe<Job>;
  jobs?: Maybe<Array<Maybe<Job>>>;
  /** Whether the sites sidebar should be opened or collapsed. */
  sidebarCollapsed: Scalars['Boolean'];
  site?: Maybe<Site>;
  /** Get a site group by ID. */
  siteGroup: SiteGroup;
  /** Get all site groups. */
  siteGroups: Array<SiteGroup>;
  sites: Array<Site>;
  sitesByIds: Array<Site>;
  /** Determine whether or not the site's sidebar should be sorted by the time's sites were last started. */
  sortSitesByLastStarted: Scalars['Boolean'];
};


export type QueryIsFeatureEnabledArgs = {
  featureName: Scalars['String'];
};


export type QueryIsUpdateAvailableArgs = {
  binVersion: Scalars['String'];
  service: SiteServiceRole;
};


export type QueryJobArgs = {
  id: Scalars['ID'];
};


export type QuerySiteArgs = {
  id: Scalars['ID'];
};


export type QuerySiteGroupArgs = {
  id: Scalars['ID'];
};


export type QuerySitesByIdsArgs = {
  ids: Array<Scalars['ID']>;
};

export type ServiceUpdateData = {
  currentVersion?: Maybe<Scalars['String']>;
  latestAvailableService?: Maybe<Scalars['JSON']>;
};

export type Site = {
  domain: Scalars['String'];
  host: Scalars['String'];
  hostConnections?: Maybe<Array<Maybe<HostConnection>>>;
  httpPort?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
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
  xdebugEnabled?: Maybe<Scalars['Boolean']>;
};

export type SiteEnvironment = 
  | 'custom'
  | 'preferred';

export type SiteGroup = {
  /** Random ShortId. Default 'Sites' group will have an id of 'default' */
  id: Scalars['ID'];
  /** Position of the group in a list of all other groups. Index starting at 0. */
  index: Scalars['Int'];
  /** Group name */
  name: Scalars['String'];
  /** Whether a site group is collapsed, used in the front end */
  open?: Maybe<Scalars['Boolean']>;
  /** Array of site ids belonging to a group */
  siteIds: Array<Scalars['String']>;
};

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
  | 'stalled'
  | 'starting'
  | 'stopping'
  | 'updating_wp'
  | 'wordpress_install_error';

export type Subscription = {
  /** Placeholder field so the schema can be extended. */
  _empty?: Maybe<Scalars['String']>;
  siteStatusChanged?: Maybe<Site>;
  sitesUpdated?: Maybe<Array<Site>>;
  siteUpdated?: Maybe<Site>;
};


export type SubscriptionSiteUpdatedArgs = {
  id?: Maybe<Scalars['ID']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddSiteInput: AddSiteInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  EpochTimestamp: ResolverTypeWrapper<Scalars['EpochTimestamp']>;
  HostConnection: ResolverTypeWrapper<HostConnection>;
  HostId: HostId;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Job: ResolverTypeWrapper<Job>;
  JobStatus: JobStatus;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  MultiSite: MultiSite;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  ServiceUpdateData: ResolverTypeWrapper<ServiceUpdateData>;
  Site: ResolverTypeWrapper<Site>;
  SiteEnvironment: SiteEnvironment;
  SiteGroup: ResolverTypeWrapper<SiteGroup>;
  SiteLiveLinkSettings: ResolverTypeWrapper<SiteLiveLinkSettings>;
  SiteMySQLInfo: ResolverTypeWrapper<SiteMySqlInfo>;
  SitePaths: ResolverTypeWrapper<SitePaths>;
  SiteService: ResolverTypeWrapper<SiteService>;
  SiteServiceRole: SiteServiceRole;
  SiteServiceType: SiteServiceType;
  SiteStatus: SiteStatus;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddSiteInput: AddSiteInput;
  Boolean: Scalars['Boolean'];
  EpochTimestamp: Scalars['EpochTimestamp'];
  HostConnection: HostConnection;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Job: Job;
  JSON: Scalars['JSON'];
  Mutation: {};
  Query: {};
  ServiceUpdateData: ServiceUpdateData;
  Site: Site;
  SiteGroup: SiteGroup;
  SiteLiveLinkSettings: SiteLiveLinkSettings;
  SiteMySQLInfo: SiteMySqlInfo;
  SitePaths: SitePaths;
  SiteService: SiteService;
  String: Scalars['String'];
  Subscription: {};
};

export interface EpochTimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EpochTimestamp'], any> {
  name: 'EpochTimestamp';
}

export type HostConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['HostConnection'] = ResolversParentTypes['HostConnection']> = {
  accountId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hostId?: Resolver<Maybe<ResolversTypes['HostId']>, ParentType, ContextType>;
  remoteSiteEnv?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  remoteSiteId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HostIdResolvers = EnumResolverSignature<{ flywheel?: any, wpe?: any }, ResolversTypes['HostId']>;

export type JobResolvers<ContextType = any, ParentType extends ResolversParentTypes['Job'] = ResolversParentTypes['Job']> = {
  error?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  logs?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['JobStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MultiSiteResolvers = EnumResolverSignature<{ No?: any, Subdir?: any, Subdomain?: any }, ResolversTypes['MultiSite']>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  addSite?: Resolver<Maybe<ResolversTypes['Job']>, ParentType, ContextType, RequireFields<MutationAddSiteArgs, 'input'>>;
  createSiteGroup?: Resolver<ResolversTypes['SiteGroup'], ParentType, ContextType, RequireFields<MutationCreateSiteGroupArgs, 'name'>>;
  deleteSiteGroup?: Resolver<ResolversTypes['SiteGroup'], ParentType, ContextType, RequireFields<MutationDeleteSiteGroupArgs, 'id'>>;
  deleteSitesFromGroups?: Resolver<Array<ResolversTypes['SiteGroup']>, ParentType, ContextType, RequireFields<MutationDeleteSitesFromGroupsArgs, 'siteIds'>>;
  moveGroupToIndex?: Resolver<Array<ResolversTypes['SiteGroup']>, ParentType, ContextType, RequireFields<MutationMoveGroupToIndexArgs, 'id' | 'index'>>;
  moveSitesToGroup?: Resolver<Array<ResolversTypes['SiteGroup']>, ParentType, ContextType, RequireFields<MutationMoveSitesToGroupArgs, 'id' | 'siteIds'>>;
  renameSite?: Resolver<Maybe<ResolversTypes['Site']>, ParentType, ContextType, RequireFields<MutationRenameSiteArgs, 'id' | 'name'>>;
  renameSiteGroup?: Resolver<ResolversTypes['SiteGroup'], ParentType, ContextType, RequireFields<MutationRenameSiteGroupArgs, 'id' | 'name'>>;
  restartSite?: Resolver<Maybe<ResolversTypes['Site']>, ParentType, ContextType, RequireFields<MutationRestartSiteArgs, 'id'>>;
  restartSites?: Resolver<Maybe<Array<Maybe<ResolversTypes['Site']>>>, ParentType, ContextType, RequireFields<MutationRestartSitesArgs, 'ids'>>;
  setGroupOpen?: Resolver<ResolversTypes['SiteGroup'], ParentType, ContextType, RequireFields<MutationSetGroupOpenArgs, 'id'>>;
  setSidebarCollapsed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSetSidebarCollapsedArgs, 'sidebarCollapsed'>>;
  setSortSitesByLastStarted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSetSortSitesByLastStartedArgs, 'sortSitesByLastStarted'>>;
  startLiveLink?: Resolver<Maybe<ResolversTypes['SiteLiveLinkSettings']>, ParentType, ContextType, RequireFields<MutationStartLiveLinkArgs, 'id'>>;
  startSite?: Resolver<Maybe<ResolversTypes['Site']>, ParentType, ContextType, RequireFields<MutationStartSiteArgs, 'id'>>;
  startSites?: Resolver<Maybe<Array<Maybe<ResolversTypes['Site']>>>, ParentType, ContextType, RequireFields<MutationStartSitesArgs, 'ids'>>;
  stopAllSites?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  stopLiveLink?: Resolver<Maybe<ResolversTypes['SiteLiveLinkSettings']>, ParentType, ContextType, RequireFields<MutationStopLiveLinkArgs, 'id'>>;
  stopSite?: Resolver<Maybe<ResolversTypes['Site']>, ParentType, ContextType, RequireFields<MutationStopSiteArgs, 'id'>>;
  updateSite?: Resolver<Maybe<ResolversTypes['Site']>, ParentType, ContextType, RequireFields<MutationUpdateSiteArgs, 'id'>>;
  upgradeLightningService?: Resolver<Maybe<ResolversTypes['Job']>, ParentType, ContextType, RequireFields<MutationUpgradeLightningServiceArgs, 'newBinVersion' | 'oldBinVersion' | 'service'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  getFeaturesArray?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  isFeatureEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<QueryIsFeatureEnabledArgs, 'featureName'>>;
  isUpdateAvailable?: Resolver<ResolversTypes['ServiceUpdateData'], ParentType, ContextType, RequireFields<QueryIsUpdateAvailableArgs, 'binVersion' | 'service'>>;
  job?: Resolver<Maybe<ResolversTypes['Job']>, ParentType, ContextType, RequireFields<QueryJobArgs, 'id'>>;
  jobs?: Resolver<Maybe<Array<Maybe<ResolversTypes['Job']>>>, ParentType, ContextType>;
  sidebarCollapsed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  site?: Resolver<Maybe<ResolversTypes['Site']>, ParentType, ContextType, RequireFields<QuerySiteArgs, 'id'>>;
  siteGroup?: Resolver<ResolversTypes['SiteGroup'], ParentType, ContextType, RequireFields<QuerySiteGroupArgs, 'id'>>;
  siteGroups?: Resolver<Array<ResolversTypes['SiteGroup']>, ParentType, ContextType>;
  sites?: Resolver<Array<ResolversTypes['Site']>, ParentType, ContextType>;
  sitesByIds?: Resolver<Array<ResolversTypes['Site']>, ParentType, ContextType, RequireFields<QuerySitesByIdsArgs, 'ids'>>;
  sortSitesByLastStarted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type ServiceUpdateDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['ServiceUpdateData'] = ResolversParentTypes['ServiceUpdateData']> = {
  currentVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  latestAvailableService?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SiteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Site'] = ResolversParentTypes['Site']> = {
  domain?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  host?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hostConnections?: Resolver<Maybe<Array<Maybe<ResolversTypes['HostConnection']>>>, ParentType, ContextType>;
  httpPort?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  liveLinkSettings?: Resolver<Maybe<ResolversTypes['SiteLiveLinkSettings']>, ParentType, ContextType>;
  localVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  longPath?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  multiSite?: Resolver<Maybe<ResolversTypes['MultiSite']>, ParentType, ContextType>;
  multiSiteDomains?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  mysql?: Resolver<Maybe<ResolversTypes['SiteMySQLInfo']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  oneClickAdminDisplayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  oneClickAdminID?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  paths?: Resolver<ResolversTypes['SitePaths'], ParentType, ContextType>;
  services?: Resolver<Maybe<Array<Maybe<ResolversTypes['SiteService']>>>, ParentType, ContextType>;
  siteLastStartedTimestamp?: Resolver<Maybe<ResolversTypes['EpochTimestamp']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['SiteStatus'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  workspace?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  xdebugEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SiteGroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['SiteGroup'] = ResolversParentTypes['SiteGroup']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  open?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  siteIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SiteLiveLinkSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['SiteLiveLinkSettings'] = ResolversParentTypes['SiteLiveLinkSettings']> = {
  basicAuthPassword?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  basicAuthUsername?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subdomain?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SiteMySqlInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['SiteMySQLInfo'] = ResolversParentTypes['SiteMySQLInfo']> = {
  database?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SitePathsResolvers<ContextType = any, ParentType extends ResolversParentTypes['SitePaths'] = ResolversParentTypes['SitePaths']> = {
  app?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  conf?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  confTemplates?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  logs?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  runData?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sql?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  webRoot?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SiteServiceResolvers<ContextType = any, ParentType extends ResolversParentTypes['SiteService'] = ResolversParentTypes['SiteService']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ports?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['SiteServiceRole']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['SiteServiceType']>, ParentType, ContextType>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SiteServiceRoleResolvers = EnumResolverSignature<{ db?: any, http?: any, php?: any }, ResolversTypes['SiteServiceRole']>;

export type SiteServiceTypeResolvers = EnumResolverSignature<{ lightning?: any }, ResolversTypes['SiteServiceType']>;

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  _empty?: SubscriptionResolver<Maybe<ResolversTypes['String']>, "_empty", ParentType, ContextType>;
  siteStatusChanged?: SubscriptionResolver<Maybe<ResolversTypes['Site']>, "siteStatusChanged", ParentType, ContextType>;
  sitesUpdated?: SubscriptionResolver<Maybe<Array<ResolversTypes['Site']>>, "sitesUpdated", ParentType, ContextType>;
  siteUpdated?: SubscriptionResolver<Maybe<ResolversTypes['Site']>, "siteUpdated", ParentType, ContextType, RequireFields<SubscriptionSiteUpdatedArgs, never>>;
};

export type Resolvers<ContextType = any> = {
  EpochTimestamp?: GraphQLScalarType;
  HostConnection?: HostConnectionResolvers<ContextType>;
  HostId?: HostIdResolvers;
  Job?: JobResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  MultiSite?: MultiSiteResolvers;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ServiceUpdateData?: ServiceUpdateDataResolvers<ContextType>;
  Site?: SiteResolvers<ContextType>;
  SiteGroup?: SiteGroupResolvers<ContextType>;
  SiteLiveLinkSettings?: SiteLiveLinkSettingsResolvers<ContextType>;
  SiteMySQLInfo?: SiteMySqlInfoResolvers<ContextType>;
  SitePaths?: SitePathsResolvers<ContextType>;
  SiteService?: SiteServiceResolvers<ContextType>;
  SiteServiceRole?: SiteServiceRoleResolvers;
  SiteServiceType?: SiteServiceTypeResolvers;
  Subscription?: SubscriptionResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

}