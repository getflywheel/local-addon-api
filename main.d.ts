/* eslint-disable max-classes-per-file, @typescript-eslint/no-use-before-define */

declare module '@getflywheel/local/main' {

	import * as Local from '@getflywheel/local';
	import { ExecFileOptions, ChildProcess } from 'child_process';
	import * as Awilix from 'awilix';
	import * as Electron from 'electron';
	import * as Winston from 'winston';

	export type ServiceContainer = Awilix.AwilixContainer<ServiceContainerServices>;
	export const getServiceContainer: () => ServiceContainer;

	export interface ServiceContainerServices {
		addonLoader: Services.AddonLoader
		adminer: Services.Adminer
		electron: typeof Electron
		siteData: typeof SiteData
		userData: typeof UserData
		sendIPCEvent: typeof sendIPCEvent
		addIpcAsyncListener: typeof addIpcAsyncListener
		appState: Services.AppState
		addonInstaller: Services.AddonInstaller
		siteProvisioner: Services.SiteProvisioner
		siteProcessManager: Services.SiteProcessManager
		siteDatabase: Services.SiteDatabase
		sequelPro: Services.SequelPro
		connectManifestFlywheel: Services.ConnectManifestFlywheel
		changeSiteDomain: Services.ChangeSiteDomain
		importSite: Services.ImportSite
		addSite: Services.AddSite
		cloneSite: Services.CloneSite
		exportSite: Services.ExportSite
		deleteSite: Services.DeleteSite
		devkit: Services.DevKit
		siteInfo: Services.SiteInfo
		siteShellEntry: Services.SiteShellEntry
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
		liveLinksPro: Services.LiveLinksPro
		liveLinksFree: Services.LiveLinksFree
		liveLinksMuPlugin: Services.LiveLinksMuPlugin
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

	export class SiteData {
		static getSites(): Local.Sites;

		static getWorkspaceSites (workspace?: string) : Local.Sites;

		static getSite (siteID: Local.Site['id']) : Local.Site | null;

		static getSiteByProperty (property: string, value: any) : Local.Site | null;

		static addSite (siteID: Local.Site['id'], site: Local.SiteJSON) : void;

		static updateSite (siteID: Local.Site['id'], site: Partial<Local.SiteJSON>) : void;

		static deleteSite (siteID: Local.Site['id']) : void;

		static reformatSites () : void;
	}

	export class UserData {
		static getPath(optionGroup: any): any;

		static get(optionGroup: any, defaults?: {} | undefined): any;

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

	export type RegisteredServices = { [serviceName: string]: { [version: string]: RegisteredService } };

	/**
	 * Registered Services are loaded and registered so downloading the service is not required.
	 */
	export interface RegisteredService extends SelectableSiteService {
		registered: true
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
	export type DownloadableServices = { [serviceName: string]: { [version: string]: DownloadableService } };

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
			darwin?: ServiceBin
			linux?: ServiceBin
			win32?: ServiceBin
			win64?: ServiceBin
		}
	}

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
		readonly $PATH: string;

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
		serviceName:string, version:string,
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

		static doActions(hook: any, ...args: any[]): Promise<any[]>;

		static addFilter(hook: any, callback: any, priority?: number): void;

		static applyFilters(hook: any, value: any, ...args: any[]): any;
	}

	export interface IAppState {
		siteStatuses: { [siteId: string]: string }
		addons: Local.AddonPackage[]
		enabledAddons: { [name: string]: boolean };
		loadedAddons: Local.AddonPackage[]
		addonStatuses: { [name: string]: Local.AddonStatus };
		updatedAddons: Local.AddonPackage['name'][]
		selectedSites: Local.SiteJSON['id'][]
		flywheelUser: any
		flywheelTeams: any
		flyAPI: any
		currentWorkspace: string | null
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
			loadedAddons: any[];

			get addonRepos(): any[];

			get enabledAddons();

			loadAddonsInRepos(): any[];

			get addonContext(): {
				environment: {
					appPath: any;
					userHome: any;
					version: any;
					userDataPath: any;
				};
				process: NodeJS.Process;
				electron: any;
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
			};

			isAddonLoaded(name: any, version: any): any;
		}

		export class Adminer {
			listen(): void;

			open(site: Local.Site): Promise<void>;
		}

		export class AppState {
			_defaultWorkspace: any;

			_state: IAppState;

			listen(): void;

			setState(state: Partial<IAppState>, notifyRenderer?: boolean): void;

			getState(): IAppState;
		}

		export class LightningServices {
			findClosestService(serviceName: string, version: string) : typeof LightningService | undefined;

			registerService(service: typeof LightningService, serviceName: string, version: string) : void;

			getSiteServices(site: Local.Site): LightningService[];

			getSiteService(site: Local.Site, serviceName: string): LightningService | null;

			getSiteServiceByRole(site: Local.Site, role: Local.SiteServiceRole): LightningService | null;

			getLatestVersion(serviceName: string, site: Local.Site): LightningService | null;

			maybeDownload(site: Local.Site) : Promise<void>;

			getRequiredDownloads(services: { [service: string]: string }) : Promise<DownloaderQueueItem[]>;

			getDownloadableServices() : Promise<DownloadableServices>;

			getRegisteredServices() : RegisteredServices;

			hasCurrentPlatformBins(bins: LightningService['bins'] | DownloadableService['bins']) : boolean;

			satisfiesEngineRequirement(service: DownloadableService) : boolean;

			getServices() : Promise<{
				[serviceName: string]: { [version: string]: DownloadableService | RegisteredService }
			}>
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

			downloadAddon(addon: any, release: any): Promise<unknown>;

			installFromDisk(zipPath: any): Promise<void>;

			cleanupTmpFiles({ addonTmpDir, archivePath, systemTmpDir }: {
				addonTmpDir?: string;
				archivePath: string;
				systemTmpDir: string;
			}): void;

			extractAddon(archivePath: any, update?: boolean): Promise<void>;

			relaunch(): void;
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

			swapService(
				site: Local.Site,
				role: Local.SiteServiceRole,
				serviceName: LightningService['serviceName'],
				serviceBinVersion: LightningService['binVersion'],
			): Promise<void>;
		}

		export class SiteProcessManager {
			start(site: Local.Site, updateStatus?: boolean, compileConfigs?: boolean): Promise<void>;

			stop(site: Local.Site, { dumpDatabase, updateStatus }?: {
				dumpDatabase: boolean;
				updateStatus?: boolean;
			}): Promise<void>;

			restart(site: Local.Site): Promise<void>;

			hasRunningProcess(site: Local.Site, name?: string): boolean;

			attachProcess(site: Local.Site, p: Process): void;

			getSiteStatus(site: Local.Site): Local.SiteStatus;

			stopAllSites(): Promise<void>;
		}

		export class SiteDatabase {
			listen(): void;

			dump(site: Local.Site, destinationFile?: string): Promise<string>;

			waitForDB(site: Local.Site, noPassword?: boolean): Promise<boolean>;

			getTablePrefix(site: Local.Site, allPrefixes?: boolean): Promise<string | string[]>;

			exec(site: Local.Site, args: any[]): Promise<string>;
		}

		export class SequelPro {
			open(site: Local.Site): void;
		}

		interface IDomains {
			old: string;
			new: string;
		}

		export class ConnectManifestFlywheel {
			create(
				manifestRequestToken: number,
				direction: ConnectDirection,
				flywheelSiteID: FlywheelSite['id'],
				environment: flywheelSiteEnvironment,
				siteId: string,
				fullSync: boolean,
			): Promise<{ manifestRequestToken, response }>;
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

		export class DevKit {
			listModifications(direction: 'push' | 'pull', args: any, allModifiedFiles: boolean): Promise<any[]>;
		}

		export class SiteInfo {
			listen(): void;

			getWpVersion(site: Local.Site): Promise<string | null>;

			getWpLatestVersion(site: Local.Site): Promise<string | null>;

			getOpenSSLVersion(site: Local.Site): Promise<string | null>;
		}

		export class SiteShellEntry {
			create(site: Local.Site): Promise<void>;

			createUnix(site: Local.Site): Promise<void>;

			createWin32(site: Local.Site): Promise<void>;

			launchDarwin(site: Local.Site): Promise<void>;

			launchWin32(site: Local.Site): Promise<void>;

			launchLinux(site: Local.Site): Promise<void>;
		}

		interface WpCliRunOpts {
			ignoreErrors?: boolean;
		}

		export class WpCli {
			listen(): void;

			run(site: Local.Site, args: string[], opts?: WpCliRunOpts): Promise<string | null>;

			getOption(site: Local.Site, option: string): Promise<string | null>;

			coreUpdate(site: Local.Site, version?: string): Promise<void>;

			isInstalled(site: Local.Site): Promise<boolean>;

			isMultisite(site: Local.Site): Promise<boolean>;
		}

		type PortServiceAllocationRequest = {
			[serviceName: string]: PortPoolAllocationRequest;
		};

		type PortPoolAllocationRequest = {
			[portName: string]: number;
		};

		type PortAllocation = { ports: { [portName: string]: Local.SitePort[] }, blacklistedPorts: number[] };

		export class Ports {
			allocatePorts(
				site: Local.Site,
				portServiceAllocationRequests: PortServiceAllocationRequest,
			): Promise<Local.Site>;

			getAvailablePort(blacklistedPorts?: Local.SitePort[]): Promise<Local.SitePort>;
		}

		export class ConfigTemplates {
			compileConfigTemplates(
				site: Local.Site,
				templatesDir: string,
				destDir: string,
				context: GenericObject,
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

		export class Blueprints {
			saveBlueprint({ name, siteId, filter }: IBlueprintsOptions): void;
		}

		export class LiveLinksMuPlugin {
			getMuPluginsPath(site: Local.Site) : string;

			add(site: Local.Site) : void;

			remove(site: Local.Site) : void;
		}

		export class LiveLinks {
			start(site: Local.Site) : Promise<GenericObject>;

			stop(site: Local.Site) : Promise<void>;

			getProcesses() : any;

			/**
	 		 * Hook to call on app shutdown, etc. to do any necessary cleanup
			 */
			onDestroy(): void;
		}

		export class LiveLinksPro extends LiveLinks {}

		export class LiveLinksFree extends LiveLinks {}
	}

}
