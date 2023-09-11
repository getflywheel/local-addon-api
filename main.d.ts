/* eslint-disable max-classes-per-file, @typescript-eslint/no-use-before-define */
declare module '@getflywheel/local/main' {

	import * as Local from '@getflywheel/local';
	import { ExecFileOptions, ChildProcess, ExecOptions } from 'child_process';
	import * as Awilix from 'awilix';
	import * as Electron from 'electron';
	import * as Winston from 'winston';
	import * as os from 'os';
	import type { GraphQLSchema, DocumentNode } from 'graphql';
	import type { IResolvers } from 'graphql-tools';
	import type { PubSub } from 'graphql-subscriptions';
	import type { ApolloClient } from 'apollo-boost';
	import type fetch from 'cross-fetch';
	import type { SiteGroup } from '@getflywheel/local/graphql';

	export { default as gql } from 'graphql-tag';

	export type ServiceContainer = Awilix.AwilixContainer<ServiceContainerServices>;
	export const getServiceContainer: () => ServiceContainer;

	export interface ServiceContainerServices {
		addonLoader: Services.AddonLoader
		adminer: Services.Adminer
		electron: typeof Electron
		os: typeof os
		siteData: Services.SiteDataService
		featureFlags: Services.FeatureFlagService
		userData: typeof UserData
		sendIPCEvent: typeof sendIPCEvent
		addIpcAsyncListener: typeof addIpcAsyncListener
		appState: Services.AppState
		addonInstaller: Services.AddonInstaller
		downloader: Services.Downloader
		errorHandler: Services.ErrorHandler
		siteProvisioner: Services.SiteProvisioner
		siteProcessManager: Services.SiteProcessManager
		siteDatabase: Services.SiteDatabase
		sitesOrganization: Services.SitesOrganizationService
		changeSiteDomain: Services.ChangeSiteDomain
		importSite: Services.ImportSite
		importSQLFile: (site: Local.Site, sqlFile: string) => Promise<string>
		addSite: Services.AddSite
		cloneSite: Services.CloneSite
		exportSite: Services.ExportSite
		deleteSite: Services.DeleteSite
		rsync: Services.Rsync
		ssh: Services.Ssh
		capi: Services.CAPI
		siteShellEntry: Services.SiteShellEntry
		browserManager: Services.BrowserManager
		wpCli: Services.WpCli
		ports: Services.Ports
		configTemplates: Services.ConfigTemplates
		localLogger: Winston.Logger
		x509Cert: Services.X509Cert
		multiSite: Services.MultiSite
		router: Services.Router
		formatHomePath: typeof formatHomePath
		blueprints: Services.Blueprints
		lightningServices: Services.LightningServices
		liveLinks: Services.LiveLinks
		liveLinksMuPlugin: Services.LiveLinksMuPlugin
		localHubClient: ApolloClient<{ uri: string; fetch: typeof fetch }>
		analyticsV2: Services.AnalyticsV2Service
		graphql: Services.GraphQLService
		jobs: Services.JobsService
		runSiteSQLCmd: (args: { site: Local.Site; query: string; additionalArgs?: string[]; }) => Promise<string>
	}

	export function sendIPCEvent(channel: string, ...args: any[]): void;

	/**
	 * Utility function for setting up IPC listener on the main thread and replying to it. This should be used only with
	 * LocalRenderer.ipcAsync()
	 *
	 * @see LocalRenderer.ipcAsync()
	 */
	export function addIpcAsyncListener(channel: string, callback: (...any) => any): void;

	export function formatHomePath(string: any, untrailingslashit?: boolean): any;

	export function formatSiteNicename(siteName: string): string;

	/**
	 * Very efficient in file string replacements using streams.
	 *
	 * @param file Path to the file
	 * @param replacements Array of replacements to perform: [ [ 'before', 'after' ] ]
	 * @param replaceStreamArgs Optional arguments for replacestream package.
	 */
	export function replaceInFileAsync(file: string, replacements: any, replaceStreamArgs?: any): Promise<void>;

	/**
	 * Helper function to create a forked child process.
	 *
	 * Utilizes the Node standard lib child_process.fork with some defaults to help keep code DRY
	 * and help functionality to just work with the Local code base.
	 *
	 * Check out the docs for ChildProcess.fork for more info:
	 * https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
	 *
	 * @param execPath path to file that should be executed
	 * @param envVarDependencies environment variables that need to be copied over to forked process
	 */
	export function workerFork(execPath, envVarDependencies: Local.GenericObject): ChildProcess;

	export type ChildProcessMessagePromiseHelper = <T>(name: string, payload?: any) => Promise<T>;
	/**
 	 * Returns up a helper function to easily communcicate between the main thread and a child thread/process
 	 * by wrapping an event listener for the "message" event with a promise which allows you to await a "call"
 	 * to another thread. It also removes the event listener once complete.
 	 *
 	 * This pairs nicely with the workerFork helper function
 	 *
 	 * @param childProcess childProcess to bind this helper to
 	 *
 	 * @returns ChildProcessMessagePromiseHelper
 	 */
	export function childProcessMessagePromiseFactory(
		childProcess: ChildProcess
	): ChildProcessMessagePromiseHelper;

	/**
	 * @deprecated Use LocalMain.Services.SiteDataService instead
	 */
	export class SiteData {
		static getSites(): Local.Sites;

		static getSite (siteID: Local.Site['id']) : Local.Site | null;

		static getSiteByProperty (property: string, value: any) : Local.Site | null;

		static addSite (siteID: Local.Site['id'], site: Local.SiteJSON) : void;

		static updateSite (siteID: Local.Site['id'], site: Partial<Local.SiteJSON>) : void;

		static deleteSite (siteID: Local.Site['id']) : void;

		static reformatSites () : void;
	}

	export class UserData {
		static getPath(optionGroup: any): any;

		static get(optionGroup: any, defaults?: {}, includeCreatedTime?: boolean, persistDefaults?: boolean): any;

		static set(optionGroup: any, data: any): any;

		static remove(optionGroup: any): any;
	}

	export interface SelectableSiteService {
		/**
		 * @description Name of the Lightning Service
		 * @TJS-examples ["php"]
		 */
		name: string

		/**
		 * @description Label of Lightning Service that's suitable for use in a UI
		 * @TJS-examples ["PHP"]
		 */
		label: string

		/**
		 * @description Build version of Lightning Service. This is typically the binVersion followed by build metadata.
		 *   This allows us to iterate on a specific binVersion by patching configs, etc.
		 *
		 * @TJS-examples ["7.3.5+2"]
		 */
		version: string

		/**
		 * @description Binary version for the service.
		 *
		 * @TJS-examples ["7.3.5"]
		 */
		binVersion: string
	}

	export type RegisteredServices = { [serviceName: string]: { [binVersion: string]: RegisteredService } };

	/**
	 * Registered Services are loaded and registered so downloading the service is not required.
	 */
	export interface RegisteredService extends SelectableSiteService {
		registered: true

		platform: LightningServicePlatform
	}

	/**
	 * DownloadableServices, DownloadableService, and ServiceBin can be converted to JSON schema using
	 * https://github.com/YousefED/typescript-json-schema
	 *
	 * Command to generate JSON Schema:
	 *  typescript-json-schema --required
	 *      ./DownloadableServices.d.ts DownloadableServices > ./DownloadableServices.schema.json
	 *
	 * @description Downloadable/Available Services for Local
	 */
	export type DownloadableServices = { [serviceName: string]: { [binVersion: string]: DownloadableService } };

	export interface DownloadableService extends SelectableSiteService {
		/**
		 * @description Engine version requirement ranges. Used to prevent users from downloading services that aren't
		 *   supported by the version of Local that they're using.
		 */
		engines: {
			/**
			 * @description Version range of Local that the service is compatible with.
			 *
			 * @TJS-examples ["^5.1.2"]
			 */
			'local-by-flywheel': string
		}

		/**
		 * @description Download URL to the core JS and configs for a given service.
		 *
		 * @format uri
		 *
		 * @TJS-examples ["https://local-cdn.fake-url/lightning/services/php/7.3.5+3/php-7.3.5.tgz"]
		 */
		url: string

		/**
		 * @description Compressed size (in bytes) of core JS files, configs, etc. (Does not include bins)
		 * @TJS-type integer
		 * @TJS-examples [51280]
		 */
		size: number

		/**
		 * @description Object containing the bin info for each platform. Platforms are optional.
		 */
		bins: {
			['darwin-arm64']?: ServiceBin
			darwin?: ServiceBin
			linux?: ServiceBin
			win32?: ServiceBin
			win64?: ServiceBin
		}

		/**
		 * @description Date for deprecation of service. If this field exists, the service won't be downloadable
		 *   after the specified date.
		 *
		 * @format UTC Date string
		 *
		 * @TJS-examples ["2022-10-19T00:00:00z"]
		 */
		endOfLife?: string
	}

	export type AvailableServices = {
		[serviceName: string]: { [binVersion: string]: DownloadableService | RegisteredService };
	};

	interface ServiceBin {
		/**
		 * @description Compressed size (in bytes) of binaries for a given platform.
		 * @TJS-type integer
		 * @TJS-examples [27355695]
		 */
		size: number

		/**
		 * @description Compressed size (in bytes) of binaries for a given platform.
		 * @format uri
		 * @TJS-examples ["https://local-cdn.fake-url/lightning/services/php/7.3.5+3/bin-darwin.tar.gz"]
		 */
		url: string
	}

	export enum LightningServicePlatform {
		DarwinArm64 = 'darwin-arm64',
		Darwin = 'darwin',
		Win32 = 'win32',
		Win32x64 = 'win64',
		Linux = 'linux',
	}

	export enum ProfileTypes {
		TEAMS = 'teams',
		USER = 'user',
		HUB = 'hub',
	}

	type Scalar = string | number | boolean;

	type ConfigVariables = { [key: string]: Scalar | Scalar[] | ConfigVariables };

	export class LightningService {
		public _site: Local.Site;

		public _lightningServices: Services.LightningServices;

		public _logger: any;

		constructor(_site:Local.Site, _lightningServices: any);

		/**
		 * Get properties and computed getters from instance. This is handy for passing the service info from the main
		 * thread to the renderer thread.
		 *
		 * @returns Properties and computed getters from instance.
		 */
		public toJSON(): Pick<LightningService,
		'_site'
		| 'serviceName'
		| 'binVersion'
		| 'configTemplatePath'
		| 'siteConfigTemplatePath'
		| 'bins'
		| 'bin'
		| '$PATH'
		| '$PATHs'
		| 'socket'
		| 'port'
		| 'ports'
		| 'env'
		| 'configVariables'
		| 'configPath'
		| 'runPath'
		| 'logsPath'
		>;

		/**
		 * @remarks
		 * Should be lowercase with no spaces and special characters.
		 *
		 * Examples:
		 *   nginx
		 *   php
		 *   mysql
		 *
		 * @returns Name of the service.
		 */
		readonly serviceName: string;

		/**
		 * Examples:
		 *   Nginx
		 *   PHP
		 *   MySQL
		 *
		 * @returns Label of the service that's suitable for use in a UI
		 */
		readonly label?: string;

		/**
		 * @remarks
		 * The version format should be parsable by semver, but does not
		 * need to be compliant.
		 *
		 * @returns Version of the binary included with the service.
		 */
		readonly binVersion: string;

		/**
		 * @returns Path to the config templates included with the service.
		 *
		 * @getter
		 */
		readonly configTemplatePath: string | null;

		/**
		 * @returns Path to config templates after they've been copied to the site directory.
		 *
		 * @getter
		 */
		readonly siteConfigTemplatePath: string;

		/**
		 * @remarks
		 * Platforms can be omitted.
		 *
		 * @returns Path to binaries for each platform.
		 *
		 * @getter
		 */
		readonly bins: { [K in LightningServicePlatform]?: { [bin: string]: string } };

		/**
		 * @returns Paths to binaries for service on current platform.
		 *
		 * @getter
		 */
		readonly bin: { [bin: string]: string } | undefined;

		/**
		 * @returns Path to socket for service on current platform.
		 *
		 * @getter
		 */
		readonly socket: string | null;

		/**
		 * @remarks
		 * These environment variables are used when Local calls WP-CLI directly.
		 *
		 * @returns Object containing environment variables for the process.
		 *
		 * @getter
		 */
		readonly env : NodeJS.ProcessEnv;

		/**
		 * @remarks
		 * Platforms can be omitted.
		 *
		 * @returns Valid path to be used in $PATH for each platform.
		 *
		 * @getter
		 */
		readonly $PATHs: { [K in LightningServicePlatform]?: string };

		/**
		 * @returns Path to be used in $PATH for current platform.
		 *
		 * @getter
		 */
		readonly $PATH?: string;

		/**
		 * @returns Object containing variables to be replaced in config templates using Handlebars.
		 *
		 * @getter
		 */
		readonly configVariables: ConfigVariables;

		/**
		 * @see LocalSiteJSON.ports
		 *
		 * @returns Port identifiers and number of ports needed. Keys should be uppercase.
		 *
		 * @getter
		 */
		readonly requiredPorts: { [portKey: string]: Local.SitePort };

		/**
		 * @see LocalSiteJSON.ports
		 *
		 * @returns Allocated ports on site for current service.
		 *
		 * @getter
		 */
		readonly ports: { [portKey: string]: Local.SitePort[] } | null;

		/**
		 * @see LocalSiteJSON.ports
		 *
		 * @returns First allocated port for service.
		 *
		 * @getter
		 */
		readonly port: Local.SitePort | null;

		/**
		 * @remarks
		 * In most cases, this path will be where the Handlebars config templates are compiled to.
		 *
		 * @returns Path to config path that the service will consume.
		 *
		 * @getter
		 */
		readonly configPath: string;

		/**
		 * @remarks
		 * Generally used for 'tmp' directories, 'data' directories, and other things you'd find in '/var/run'.
		 *
		 * @returns Path to 'run' directory for service.
		 *
		 * @getter
		 */
		readonly runPath: string;

		/**
		 * @remarks
		 * Path will typically be in the site's 'logs' directory adjacent to the 'app' directory.
		 *
		 * @returns Path to log directory the service.
		 *
		 * @getter
		 */
		readonly logsPath: string;

		/**
		 * @remarks
		 * Only used by PHP service attached to site at this time.
		 *
		 * @returns Shell script to be added to the Site Shell Entry startup script.
		 *
		 * @getter
		 */
		readonly siteShellStartupPOSIX: string;

		/**
		 * @remarks
		 * Only used by PHP service attached to site at this time.
		 *
		 * @returns Batch script be added to the Site Shell Entry startup script.
		 *
		 * @getter
		 */
		readonly siteShellStartupBat: string;

		/**
		 * Ran before a service is started for the first time.
		 *
		 * @remarks
		 * This is commonly used for setting up data directories or whatever is necessary to allow a service to start
		 * for the first time.
		 *
		 * @returns Promise
		 */
		preprovision?(): Promise<void>;

		/**
		 * Ran after a service is started for the first time.
		 *
		 * @remarks
		 * Used for setting up MySQL databases, users, etc.
		 *
		 * @returns Promise
		 */
		provision?(): Promise<void>;

		/**
		 * Ran after WordPress is fully installed when a new site is created. This will not be ran during
		 * imports or pulls.
		 *
		 * @returns Promise
		 */
		finalizeNewSite?() : Promise<void>;

		/**
		 * @returns IProcessOpts[] Necessary processes for a given service.
		 */
		start(): Local.IProcessOpts[];

		/**
		 * Do things before a service is stopped. Can be used for dumping databases prior to completely stopping
		 * the process.
		 *
		 * @returns Promise
		 */
		stop?(): Promise<void>
	}

	export const registerLightningService: (
		service: typeof LightningService,
		serviceName:string,
		binVersion:string,
	) => void;

	export function execFilePromise(
		command: string,
		args: string[],
		execFileOptions?: ExecFileOptions,
	): Promise<string>;

	/**
	 * Downloadable item that can be passed to LocalMain.DownloaderQueue
	 */
	export interface DownloaderQueueItem {
		id?: string
		size: number
		url: string
		label: string
		extract?: boolean,
		onCancel?: () => void
		dest: string
		status?: 'aborted' | 'waiting' | 'done' | 'in-progress'

		/* bytes downloaded */
		downloaded?: number

		/* md5Hash that the download will be verified against after downloading */
		md5Hash?: string

		/* Integer (0 to 100) representing progress */
		progress?: number
	}

	export class DownloaderQueue {
		public id: string;

		public queue: any[];

		static getInstance(id) : DownloaderQueue;

		public updateItem(queueItem:DownloaderQueueItem, updated:Partial<DownloaderQueueItem>) : void;

		public clear() : void;

		public addItem(item:DownloaderQueueItem) : void;

		public run(args:{ rejectOnCancel: boolean }) : Promise<void>;
	}

	export class HooksMain {
		static registeredHooks: {
			actions: {};
			filters: {};
		};

		static addAction(hook: any, callback: any, priority?: number): void;

		static doActions(hook: any, ...args: any[]): Promise<any[] | undefined>;

		static addFilter(hook: any, callback: any, priority?: number): void;

		static applyFilters(hook: any, value: any, ...args: any[]): any;
	}

	export interface IAppState {
		siteStatuses: { [siteId: string]: Local.SiteStatus }
		addons: Local.AddonPackage[]
		enabledAddons: { [name: string]: boolean };
		loadedAddons: Local.AddonPackage[]
		addonStatuses: { [name: string]: Local.AddonStatus };
		updatedAddons: Local.AddonPackage['name'][]
		selectedSites: Local.SiteJSON['id'][]
		flywheelUser: any
		flywheelTeams: any
	}

	/**
	 * Jobs
	 */
	export enum JobStatus {
		CREATED = 'created',
		RUNNING = 'running',
		SUCCESSFUL = 'successful',
		FAILED = 'failed',
	}

	export class Job {
		public id: string;

		public status: JobStatus;

		public logs: string;

		public error: Error;

		public readonly meta: Local.GenericObject;

		constructor(meta: Local.GenericObject);

		await(promise: Promise<any>) : Promise<Job>;

		start(): void;

		succeed(): void;

		fail(e: Error): void;

		log(log: string): void;
	}

	/**
	 * Process and Process Groups
	 */
	export class ProcessGroup {
		processes: Process[];

		constructor(processes: Process[]);

		startAll(): Promise<any[]>;

		stopAll(): Promise<any[]>;

		restartAll(): Promise<any[]>;

		attachProcess(p: Process): void;
	}

	export interface ProcessStat {
		/**
		 * percentage (from 0 to 100*vcore)
		 */
		cpu: number;
		/**
		 * bytes
		 */
		memory: number;
		/**
		 * PPID
		 */
		ppid: number;
		/**
		 * PID
		 */
		pid: number;
		/**
		 * ms user + system time
		 */
		ctime: number;
		/**
		 * ms since the start of the process
		 */
		elapsed: number;
		/**
		 * ms since epoch
		 */
		timestamp: number;
	}

	export class Process implements Local.IProcessOpts {
		childProcess: ChildProcess | undefined;

		name: Local.IProcessOpts['name'];

		binPath: Local.IProcessOpts['binPath'];

		args: Local.IProcessOpts['args'];

		env?: Local.IProcessOpts['env'];

		cwd?: Local.IProcessOpts['cwd'];

		onError?: Local.IProcessOpts['onError'];

		stdioLogging: Local.IProcessOpts['stdioLogging'];

		errored: boolean;

		/**
		 * Number of restarts the process has encountered since the process was initialized.
		 */
		restarts: number;

		constructor(opts: Local.IProcessOpts);

		start(): Promise<void>;

		restart(): Promise<void>;

		listen(): void;

		removeListeners(): void;

		/**
		 * Attach a readline interface no matter what. MailHog will eventually hang if it doesn't have anything
		 * listening to its output.
		 */
		readline(): void;

		autoRestarter: () => Promise<void>;

		errorListener: (err: any) => void;

		closeListener: (code: any, signal: any) => void;

		stop: () => Promise<void>;

		stats(): Promise<ProcessStat>;
	}

	/**
	 * Importer Interfaces
	 */
	export interface IImportSiteSettings extends Local.NewSiteInfo {
		importData: IImportData
		zip: string
	}

	export interface IImportData {
		wpVersion?: string,
		multiSiteInfo?: any,
		oldSite?: any
		fileDir?: string
		sql?: any
		metadata?: any
		type?: string
	}

	/**
	 * The data that a `wpmigrate-export.json` file contains.
	 */
	export interface WpMigrateJSON {
		name: string;
		domain: string;
		path: string;
		wpVersion: string;
		services: {
			php?: {
				name: string;
				version: string;
			};
			mysql?: {
				name: string;
				version: string;
			};
			mariadb?: {
				name: string;
				version: string;
			};
			nginx?: {
				name: string,
				version: string,
			},
			apache?: {
				name: string;
				version?: string;
			};
			flywheel?: {
				name: string;
				version: string;
			};
		};
		wpMigrate: {
			version: string;
		};
	}

	/**
	 * The data needed to import a WP Migrate archive.
	 *
	 * @property zip The path to the archive is on disk.
	 */
	export interface WpMigrateImport extends WpMigrateJSON {
		zip: string;
	}

	export interface AddonMainContext {
		environment: {
			appPath: any;
			userHome: any;
			version: any;
			userDataPath: any;
		};
		process: NodeJS.Process;
		electron: typeof Electron;
		request: any;
		fileSystem: any;
		fileSystemJetpack: any;
		notifier: {
			notify: ({ title, message, open }: {
				title: any;
				message: any;
				open: any;
			}) => void;
		};
		events: {
			send: any;
		};
		storage: {
			get: (defaultValue?: any) => void;
			set: (value: any) => void;
		};
		hooks: typeof HooksMain;
	}

	export { SiteGroup } from '@getflywheel/local/graphql';

	/** Data structure stored in site-groups.json */
	export interface SiteGroupsData {
		/**
		 * Maps sites to their groups, like a join table.
		 * Useful for speeding up operations.
		 * */
		siteMap: {
			[siteId: string]: SiteGroup['id'];
		}
		/** Site groups in object format */
		groups: {
			[siteGroupId: SiteGroup['id']]: SiteGroup;
		}
		/** Whether to sort sites in a group by last started timestamp. */
		sortSitesByLastStarted: boolean;
		/** Open state for the sidebar, as it's collapsable */
		sidebarCollapsed?: boolean;
	}

	export interface WPEConnectArgs {
		includeSql?: boolean
		requiresProvisioning?: boolean
		wpengineInstallName: string
		wpengineInstallId: string
		wpengineSiteId: string
		wpenginePrimaryDomain: string
		localSiteId: string
		environment?: import('../main/capi/client/api').SiteInstalls.EnvironmentEnum
		files?: string[],
		isMagicSync?: boolean,
	}

	export interface RsyncRunArgs {
		/** Array of flags to send to the rsync command */
		args: string[];
		/** Working directory for the spawned rsync process. For Connect, it should be app/public folder */
		cwd?: string;
		/** Progress handler function, will receive output from rsync */
		progress?: (string: string) => void;
	}

	export interface SshRunArgs {
		/** Remote username */
		username: string;
		/** Remote host */
		host: string;
		/** Path to private SSH key (used for -i flag) */
		sshKey?: string;
		/** Array of flags/args to send to the ssh command */
		sshArgs?: string[];
		/** Command to execute remotely as a single string, like 'wp plugin list' */
		command: string;
		/** ExecOptions are options passed to the exec command. Common would include CWD */
		execOptions?: ExecOptions;
	}

	/**
	 * Modules for Service Container
	 *
	 * The typings here exclude the constructor and any properties in services that are used to reference other
	 * services.
	 *
	 * Important! While Services is exported here, it's only for typings. To access the services here, you will need to
	 * use LocalMain.getServiceContainer()
	 *
	 * @see ServiceContainer
	 * @see getServiceContainer()
	 */
	export module Services {
		export class AddonLoader {
			loadedAddons: Local.AddonPackage[];

			get addonRepos(): any[];

			get enabledAddons();

			loadAddonsInRepos(): any[];

			get addonContext(): AddonMainContext;

			isAddonLoaded(name: any, version: any): any;
		}

		export class Adminer {
			listen(): void;

			open(site: Local.Site): Promise<void>;
		}

		export class AppState {
			_state: IAppState;

			listen(): void;

			setState(state: Partial<IAppState>, notifyRenderer?: boolean): void;

			getState(): IAppState;
		}

		export class FeatureFlagService {
			isFeatureEnabled(feature: string): boolean;

			getFeaturesArray(): { [key: string]: boolean };
		}

		export class LightningServices {
			registerService(service: typeof LightningService, serviceName: string, binVersion: string) : void;

			deregisterService(serviceName: string, binVersion: string) : void;

			getMissingServices(site: Local.Site): Array<Local.SiteService>;

			getSiteServices(site: Local.Site): LightningService[];

			getSiteService(site: Local.Site, serviceName: string): LightningService | null;

			getSiteServiceByRole(site: Local.Site, role: Local.SiteServiceRole): LightningService | null;

			getLatestVersion(serviceName: string, site: Local.Site): LightningService | null;

			maybeDownload(site: Local.Site) : Promise<DownloaderQueueItem[]>;

			/**
			 * Retrieves a service from "services" based on a given bin version.
			 * - First checks if binVersion is available and returns it.
			 * - If not, tries to find the highest available patch version and return it.
			 * - Returns undefined if none found.
			 */
			getSameOrHighestPatchService<ServiceType>(
				binVersion: string,
				services?: { [binVersion: string]: ServiceType },
			): ServiceType | undefined;

			getRequiredDownloads(services: { [service: string]: string }) : Promise<DownloaderQueueItem[]>;

			getDownloadableServices(role?: Local.SiteServiceRole) : Promise<DownloadableServices>;

			getRegisteredServices(role?: Local.SiteServiceRole) : RegisteredServices;

			hasCurrentPlatformBins(bins: LightningService['bins'] | DownloadableService['bins']) : boolean;

			satisfiesEngineRequirement(service: DownloadableService) : boolean;

			getServices(role?: Local.SiteServiceRole) : Promise<{
				[serviceName: string]: { [version: string]: DownloadableService | RegisteredService }
			}>

			/**
			 * Returns the closest Lightning Service string from the provided `AvailableServices`.
			 *
			 * @returns Matched service strings are of the form `<service>-<version>`, for example `php-8.1.9`.
			 */
			getClosestServiceString(
				service: string,
				binVersion: string,
				services: AvailableServices
			): string | undefined;
		}

		export interface LightningDBService extends LightningService {
			waitForDB(noPassword?: boolean): Promise<boolean>;
		}

		export class AddonInstaller {
			get addonsPath(): any;

			listen(): void;

			getAddonName(addon: any): any;

			setEnabledAddons(enabledAddons: any): void;

			setAddonEnabledState(addon: any, enabled: any): void;

			enableAddon(addon: any): void;

			disableAddon(addon: any): void;

			uninstallAddon(addon: any): void;

			toggleAddon(addon: any): void;

			setAddonStatus(addon: any, addonState: any): void;

			clearAddonStatus(addon: any): void;

			installAddon(addon: any, release: any): Promise<void>;

			updateAddon(addonName: any, release: any): Promise<void>;

			downloadAndExtractAddon(addon: any, release: any, update: boolean): Promise<unknown>;

			installFromDisk(zipPath: any): Promise<void>;

			relaunch(): void;
		}

		/**
		 * This service sets up the necessary IPC handlers for getting queues from the main thread into the renderer.
		 */
		export class Downloader {
			listen(): void;
		}

		export interface IHandledError {
			error: typeof Error
			message: string
			dialogTitle: string
			dialogMessage: string
			[metaKey: string]: any
		}

		/**
		 * The ErrorHandler service makes it easy to send errors from the renderer and log them to file, show a dialog,
		 * and send the error to Sentry.
		 */
		export class ErrorHandler {
			listen(): void;

			handleError(handledError: IHandledError): void;
		}

		export class SiteProvisioner {
			/**
			 * Check that the necessary VC Redists are installed if the user is running Windows.
			 *
			 * If these are not present, the user won't be presented with a productive error nor will the log file
			 * include an error pointing out that a DLL is missing.
			 */
			checkForWinRedists(): Promise<void>;

			onProvisionError(site: Local.Site, e: Error): Promise<void>;

			provision(site: Local.Site): Promise<void>;

			finalizeNewSite(site: Local.Site): Promise<void>;

			swapService(
				site: Local.Site,
				role: Local.SiteServiceRole,
				serviceName: LightningService['serviceName'],
				serviceBinVersion: LightningService['binVersion'],
				restartRouter?: boolean,
			): Promise<void>;
		}

		export interface StopSiteOptions {
			dumpDatabase?: boolean;
			updateStatus?: boolean;
		}

		export class SiteProcessManager {
			start(site: Local.Site, updateStatus?: boolean,
				compileConfigs?: boolean, restartRouter?: boolean, useCheckPorts?: boolean): Promise<void>;

			stop(site: Local.Site, opts?: StopSiteOptions): Promise<void>;

			stopSites(siteIds: Local.Site['id'][]): Promise<void>;

			restart(site: Local.Site): Promise<void>;

			restartSiteService(site: Local.Site, serviceName: string): Promise<void>;

			hasRunningProcess(site: Local.Site, name?: string): boolean;

			attachProcess(site: Local.Site, p: Process): void;

			getSiteStatus(site: Local.Site): Local.SiteStatus;

			getSiteStatuses() : { [siteId: string]: Local.SiteStatus };

			stopAllSites(opts?: StopSiteOptions): Promise<void>;
		}

		export class SiteDatabase {
			listen(): void;

			dump(site: Local.Site, destination?: string): Promise<string>;

			waitForDB(site: Local.Site, noPassword?: boolean): Promise<boolean>;

			getTablePrefix(site: Local.Site, allPrefixes?: boolean, useDatabase?: boolean): Promise<string | string[]>;

			runQuery(site: Local.Site, query: string): Promise<string>;

			exec(site: Local.Site, args: any[]): Promise<string>;
		}

		export class SitesOrganizationService {
			saveSortData({ siteId, sortData }: {
				siteId: string,
				sortData: { siteLastStartedTimestamp: number }
			}): void;

			/**
			 * sites-organization.json stores an array of siteID's with last-started timestamps and starred status.
			 * Keeping for backwads compatibility.
			 */
			static ORGANIZATION_DATA_SLUG: string;

			/** site-groups.json stores group data and a site-to-group map */
			static GROUPS_DATA_SLUG: string;

			/**
			 * Get an array of site groups.
			 * If no site-groups.json file exists, default "Sites" and "Starred" groups will be returned.
			 *
			 * @returns Array of SiteGroup objects
			 */
			getSiteGroups(): SiteGroup[]

			/**
			 * Get a site group by id.
			 * If no site-group exists, an error is thrown.
			 *
			 * @param id Group ID
			 *
			 * @returns SiteGroup object of specified ID
			 */
			getSiteGroupById(id: SiteGroup['id']): SiteGroup

			/**
			 * Create a new site group. If array of siteIds is passed, those sites are moved from their current groups.
			 *
			 * @param name String with new group name
			 * @param siteIds (optional) Array of siteIDs to create group with
			 * @param index (optional) Index to move new group to, defaults to next available
			 * @param open (optional) Open state for group, defaults to "true"
			 *
			 * @returns Newly created group. Note - other groups may be affected by group creation, but the front end
			 * will need to refetch the groups query to update the cache anyway.
			 */
			createSiteGroup(
				name: SiteGroup['name'], siteIds?: SiteGroup['siteIds'], index?: number, open?: boolean
			): SiteGroup

			/**
			 * Delete a site group. All sites in the group will be moved to the default "Sites" group
			 *
			 * @param groupId ID of group to delete
			 *
			 * @returns Deleted group. Note - other groups may be affected by group deletion, but the front end
			 * will need to refetch the groups query to update the cache anyway.
			 */
			deleteSiteGroup(groupId: SiteGroup['id']): SiteGroup

			/**
			 * Rename a site group.
			 *
			 * @param id ID of group to rename
			 * @param name New name of group
			 *
			 * @returns renamed group
			 */
			renameSiteGroup(id: SiteGroup['id'], name: SiteGroup['name']): SiteGroup

			/**
			 * Move sites from their current group to a new group.
			 * To move a single site, pass it in an array.
			 *
			 * This function will also add a site that does not yet exist in site-groups.json.
			 *
			 * @param siteIds required array of Site ID's to move - can be nonexistent site ID's
			 * @param id ID of the group to which sites are moved
			 * @param refetchGroups Send an IPC event to refetch groups - defaults to "false"
			 *
			 * @returns Array of all groups affected by the move, updated to reflect the change.
			 */
			moveSitesToGroup(siteIds: string[], id: SiteGroup['id'], refetchGroups?: boolean): SiteGroup[]

			/**
			 * Remove site ids from their respective groups, and from site-groups.json altogether.
			 * To remove a single site, pass it in an array.
			 *
			 * @param siteIds required array of Site ID's to remove
			 * @param refetchGroups Send an IPC event to refetch groups - defaults to "false"
			 *
			 * @returns Array of all groups affected, with sites removed.
			 */
			deleteSitesFromGroups(siteIds: string[], refetchGroups?: boolean): SiteGroup[]

			/**
			 * Set the open state for a site group.
			 *
			 * Note: Making this an explicit set as oppsed to a simple toggle allows for features such
			 * as "Close all groups", for example
			 *
			 * @param id ID of group to open or close
			 * @param open (optional) New open state, true for open, false for closed. Defaults to "false".
			 *
			 * @returns Affected group
			 */
			setGroupOpen(id: SiteGroup['id'], open?: boolean): SiteGroup

			/**
			 * Moves a site group to a certain index. We are calling those "move" instead of "set" because
			 * other site groups will have their indices affected (i.e. increased or decreased by 1).
			 *
			 * @param id ID of group to move
			 * @param index New index, as integer. Negative numbers will default to index 0, numbers higher than
			 * the number of groups will move the group to the end.
			 *
			 * @returns Array of affected groups
			 */
			moveGroupToIndex(id: SiteGroup['id'], newIndex: number): SiteGroup[]

			/**
			 * Public function to retrieve the current value of SiteGroupsData.sortSitesByLastStarted
			 *
			 * @returns Value of Localmain.SiteGroupsData.sortSitesByLastStarted
			 */
			getSortSitesByLastStarted(): boolean;

			/**
			 * Sets the sort status for sites in all groups. Note this is stored as a single
			 * persisted variable for now, not on a group-by-group basis.
			 *
			 * @param sortSitesByLastStarted Value to set, a boolean.
			 *
			 * @returns The new persisted value.
			 */
			setSortSitesByLastStarted(sortSitesByLastStarted: boolean): boolean;

			/**
			 * The sites sidebar is collapsable. This method persists the open state to site-groups.json
			 *
			 * @param sidebarCollapsed Collapsed state, boolean
			 *
			 * @returns Value of Localmain.SiteGroupsData.sidebarCollapsed
			 */
			setSidebarCollapsed(sidebarCollapsed: boolean): boolean

			/**
			 * Retrieve the current collapsed state for the sites sidebar
			 *
			 * @returns new collapsed state
			 */
			getSidebarCollapsed(): boolean
		}

		interface IDomains {
			old: string;
			new: string;
		}

		export class ChangeSiteDomain {
			getSelectedSite(): Local.Site | null;

			changeSiteDomainToHost(site?: Local.Site | null): Promise<void>;

			/**
			 * If using localhost routing, enforce the URLs to use HTTP.
			 *
			 * @param url
			 */
			requiresProtocolChange(url: any): boolean;

			change(
				site: Local.Site,
				domains: IDomains,
				silent?: boolean,
				updateSite?: boolean,
				desiredProtocol?: 'http' | 'https' | null,
			): Promise<void>;
		}

		export class ImportSite {
			run(importSiteSettings: IImportSiteSettings): Promise<any>;

			connectV2 (importSiteSettings: any) : any;

			connectWPE(importSiteSettings: IImportSiteSettings, site: Local.SiteJSON) : any;
		}

		interface IWPCredentials {
			adminUsername: string;
			adminPassword: string;
			adminEmail: string;
		}

		interface IAddSite {
			newSiteInfo: Local.NewSiteInfo;
			wpCredentials: IWPCredentials;
			goToSite: boolean;
			installWP?: boolean;
		}

		export class AddSite {
			listen(): void;

			addSite({
				newSiteInfo,
				wpCredentials,
				goToSite,
				installWP,
			}: IAddSite): Promise<Local.Site>;

			finishAddingSite(site: Local.Site): void;
		}

		interface ICloneSite {
			site: Local.Site
			newSiteName: string
		}

		export class CloneSite {
			listen(): void;

			cloneSite({
				site,
				newSiteName,
			}: ICloneSite): Promise<Local.Site>;
		}

		interface IExportSite {
			site: Local.SiteJSON;
			outputPath: string;
			filter: string;
		}

		export class ExportSite {
			listen(): void;

			exportSite({ site, outputPath, filter }: IExportSite): Promise<void>;
		}

		interface IDeleteSite {
			site: Local.Site;
			trashFiles: boolean;
			updateHosts?: boolean;
		}
		interface IDeleteSites {
			siteIds: Local.Site['id'][];
			trashFiles: boolean;
			updateHosts?: boolean;
		}

		export class DeleteSite {
			listen(): void;

			deleteSite({ site, trashFiles, updateHosts }: IDeleteSite): Promise<void>;

			deleteSites({ siteIds, trashFiles, updateHosts }: IDeleteSites): Promise<void>;
		}

		/**
		 * Service for running SSH commands via child_process.exec()
		 *
		 * Differs from SSHKeyService, which handles all things SSH key/pair related.
		 * */
		export class Ssh {
			/** Run an ssh command */
			run(args: SshRunArgs): Promise<string | undefined>;

			/** Get a path to the default known_hosts file */
			getDefaultKnownHostsPath(): string;
		}

		export class CAPI {
			createBackup(installId: string, description: string): Promise<void>;

			purgeCache(installId: string, type: any): Promise<void>;
		}

		export class Rsync {
			/**
			 * Given an RsyncRunArgs object, spawns the rsync process with the provided args inside of CWD.
			 * Logs any data to stdout or stderror via the Local Logger.
			 *
			 * On "exit" with code 0, resolves with a string containing all emitted data.
			 * On "error" or exit code !== 0, rejects with the error.
			 * */
			run(args: RsyncRunArgs): Promise<string>;
		}

		export class SiteShellEntry {
			launch(site: Local.Site): Promise<void>;

			createShellEntry(site: Local.Site): Promise<void>;

			createBatchEntry(site: Local.Site): Promise<void>;
		}

		export class BrowserManager {
			getAvailableBrowsers() : Promise<string[]>;

			openInBrowser(siteUrl: string): void;
		}

		export interface WpCliRunOpts {
			ignoreErrors?: boolean;
			skipThemes?: boolean;
			skipPlugins?: boolean;
			env?: NodeJS.ProcessEnv;
		}

		export interface WpTheme {
			name: string;
			title: string;
			status: string;
			version: string;
		}

		export interface WpPlugin extends WpTheme{
			file: string;
		}

		export class WpCli {
			listen(): void;

			run(site: Local.Site, args: string[], opts?: WpCliRunOpts): Promise<string | null>;

			getOption(site: Local.Site, option: string): Promise<string | null>;

			coreUpdate(site: Local.Site, version?: string): Promise<void>;

			isInstalled(site: Local.Site): Promise<boolean>;

			isMultisite(site: Local.Site): Promise<boolean>;

			getWpVersion(site: Local.Site): Promise<string | null>;

			getWpLatestVersion(site: Local.Site): Promise<string | null>;

			getPlugins(site: Local.Site): Promise<WpPlugin[] | null>

			getThemes(site: Local.Site): Promise<WpTheme[] | null>
		}

		type PortServiceAllocationRequest = {
			[serviceName: string]: PortPoolAllocationRequest;
		};

		type PortPoolAllocationRequest = {
			[portName: string]: number;
		};

		type PortAllocation = { ports: { [portName: string]: Local.SitePort[] }, blacklistedPorts: number[] };

		export class Ports {
			public siteData: SiteDataService;

			allocatePorts(
				site: Local.Site,
				portServiceAllocationRequests: PortServiceAllocationRequest,
			): Promise<Local.Site>;

			getAvailablePort(blacklistedPorts?: Local.SitePort[]): Promise<Local.SitePort>;

			checkAndReplaceUnavailablePorts(site: Local.Site): Promise<{
				site: Local.Site,
				domains: { old: string, new: string },
			}>;
		}

		export class ConfigTemplates {
			compileConfigTemplates(
				site: Local.Site,
				templatesDir: string,
				destDir: string,
				context: Local.GenericObject,
			) : Promise<void>;

			compileServiceConfigs(site: Local.Site): Promise<void>;
		}

		interface SiteCerts {
			certPath: string;
			keyPath: string;
		}

		export class X509Cert {
			listen(): void;

			static getSiteCertPath(site: Local.Site): any;

			trustCert(site: Local.Site): Promise<void>;

			certificateTrustStatus(site: Local.Site): Promise<any>;

			static generateCert(domain: any, certsPath: any): Promise<SiteCerts>;

			static generateSiteCert(site: Local.Site, force?: boolean): Promise<void>;
		}

		export class MultiSite {
			listen(): void;

			syncSubdomains(site: Local.Site): Promise<void>;
		}

		export class Router {
			listen(): void;

			clearRouterBanner(): void;

			setRoutingMode(mode: any, changeDomain?: boolean): void;

			/**
			 * On macOS versions older than Mojave, launchd is required to start up the router so privileged ports such
			 * as port 80 and 443 can be used.
			 */
			get useLaunchd(): boolean;

			get nginxPath(): any;

			static get runPath(): any;

			static get certPaths(): any;

			static get confPath(): any;

			static get plistTemplatePath(): any;

			generateRouterLaunchdPlist(): Promise<string>;

			getHTTPPortForSite(site: Local.Site): Local.SitePort | null;

			getSiteHTTPPortsByDomain(): {
				[domain: string]: number;
			};

			doesLaunchdDaemonNeedsReload(): boolean;

			doesNginxNeedBindCap(): boolean;

			setNginxBindCap(): Promise<void>;

			restartLaunchdDaemon(force?: boolean): Promise<void>;

			unloadLaunchdDaemon(): Promise<void>;

			restart: (updateHosts?: boolean) => Promise<void>;

			stop(): Promise<void>;

			refresh(): Promise<void>;

			add(site: Local.Site): Promise<void>;

			remove(domain: any): void;
		}

		interface IBlueprintsOptions {
			name: string;
			siteId: Local.SiteJSON['id'];
			filter: string;
		}

		export interface IBlueprint {
			name: string;
			lastModified: string;
			created?: string;
			phpVersion?: string;
			webServer?: Local.SiteService;
			database?: Local.SiteService;
			plugins?: WpPlugin[];
			themes?: WpTheme[];
			multisite?: boolean;
			headless?: boolean;
		}

		export class Blueprints {
			saveBlueprint({ name, siteId, filter }: IBlueprintsOptions): void;
		}

		export class LiveLinksMuPlugin {
			getMuPluginsPath(site: Local.Site) : string;

			add(site: Local.Site) : void;

			remove(site: Local.Site) : void;
		}

		export class LiveLinksBase {
			start(site: Local.Site) : Promise<Local.GenericObject>;

			stop(site: Local.Site) : Promise<void>;

			getProcesses() : any;

			/**
	 		 * Hook to call on app shutdown, etc. to do any necessary cleanup
			 */
			onDestroy(): void;
		}

		export class LiveLinks extends LiveLinksBase {}

		export class AnalyticsV2Service {}

		export class GraphQLService {
			pubsub: PubSub;

			start() : void;

			registerGraphQLService(
				serviceId: string,
				schema?: GraphQLSchema | DocumentNode,
				resolvers?: IResolvers
			) : void;
		}

		export class JobsService {
			addJob(meta: Local.GenericObject): Job;
		}

		export class SiteDataService {
			PUBSUB_TOPIC_SITES_UPDATED:string;

			PUBSUB_TOPIC_SITE_UPDATED: string;

			getSites(): Local.Sites;

			upgradeServices(site: Local.SiteJSON) : Local.SiteServices;

			emitSitesUpdate(sites?: Local.SitesJSON) : void;

			emitSiteUpdate(site: Local.SiteJSON) : void;

			getSite (siteID: Local.Site['id']) : Local.Site | null;

			getSiteByProperty (property: string, value: any) : Local.Site | null;

			addSite (siteID: Local.Site['id'], site: Local.SiteJSON) : void;

			updateSite (siteID: Local.Site['id'], site: Partial<Local.SiteJSON>) : void;

			deleteSite (siteID: Local.Site['id']) : void;

			reformatSites () : void;

			removeHostConnections (host: string) : void;
		}
	}

}
