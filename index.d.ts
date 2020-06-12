// eslint-disable-next-line max-classes-per-file
declare type GenericObject = { [key: string]: any };

declare module '@getflywheel/local' {

	/**
	 * NOTE: all enum declarations must be copied over to `index.d.ts` as well.
	 */

	export enum MultiSite {
		No = '',
		Subdir = 'ms-subdir',
		Subdomain = 'ms-subdomain'
	}

	export enum SiteServiceType {
		LIGHTNING = 'lightning',
		DOCKER_COMPOSE = 'docker-compose',
	}

	export enum SiteServiceRole {
		HTTP = 'http',
		DATABASE = 'db',
		PHP = 'php'
	}

	export enum AddonStatus {
		INSTALLED = 'installed',
		INSTALLING = 'installing',
		UPDATING = 'updating',
	}

	export type SiteService = {
		version: string
		type: SiteServiceType
		ports?: { [portKey: string]: SitePort[] }
		role?: SiteServiceRole
	};

	/**
	 * Commonly used arguments for site creation (new site, pulling, importing, etc).
	 */
	export interface NewSiteInfo {
		siteName: string
		sitePath: string
		siteDomain: string
		multiSite: MultiSite
		phpVersion?: string
		database?: string
		environment?: string
		blueprint?: string
		webServer?: string
	}

	export type SiteServices = { [serviceName: string]: SiteService };

	export type SitePort = number;
	export type SiteStatus = 'running' | 'halted' | 'starting' | 'stopping';

	export type SiteLiveLinkProSettings = {
		subdomain: string
		basicAuthUsername: string
		basicAuthPassword: string
	};

	export interface SiteJSON {
		id: string
		path: string
		hostConnections?: HostConnection[] | null
		localVersion?: string
		services: SiteServices
		multiSite: MultiSite
		multiSiteDomains?: string[]
		mysql?: {
			database: string
			user: string
			password: string
		}
		name: string
		domain: string
		workspace?: string | null

		liveLinkProSettings?: SiteLiveLinkProSettings;

		/* Deprecated */
		flywheelConnect?: string
		sslSHA1?: string
		clonedImage?: string
		devMode?: boolean
		container?: string
		phpVersion?: string
		mysqlVersion?: string
		webServer?: string
		ports?: { [portName: string]: SitePort | SitePort[] }
		environment?: string
		environmentVersion?: string

		[key: string]: any
	}

	export type SitesJSON = { [siteID: string]: SiteJSON };

	export class Site implements SiteJSON {
		id: string;

		path: string;

		localVersion: string;

		services: SiteServices;

		multiSite: SiteJSON['multiSite'];

		multiSiteDomains: SiteJSON['multiSiteDomains'];

		mysql?: {
			database: string;
			user: string;
			password: string;
		};

		name: string;

		domain: string;

		workspace?: string;

		sslSHA1?: string;

		hostConnections?: SiteJSON['hostConnections'];

		liveLinkProSettings?: SiteJSON['liveLinkProSettings'];

		/* Deprecated */
		flywheelConnect?: string;

		devMode?: boolean;

		container?: string;

		clonedImage?: string;

		paths: SitePaths;

		phpVersion?: string;

		webServer?: string;

		mysqlVersion?: string;

		ports?: SiteJSON['ports'];

		environment?: string;

		environmentVersion?: string;

		/* End Deprecated properties */

		constructor(siteJson: SiteJSON);

		toJSON(): SiteJSON;

		static find(id: SiteJSON['id']): Site;

		getService(serviceName: string) : SiteService & { name: string };

		getSiteServiceByRole(role: SiteServiceRole) : SiteService & { name: string } | undefined;

		readonly longPath: string;

		readonly host: string;

		readonly url: string;

		readonly httpPort: number | undefined;
	}

	/**
	 * Represents a host connection with basic host and remote information.
	 */
	export interface HostConnection {
		accountId: string | undefined;
		hostId: HostId | undefined;
		remoteSiteId?: string | undefined;
	}

	/**
	 * Represents a unique identifier for each supported host.
	 */
	export enum HostId {
		FLYWHEEL = 'flywheel',
		WPE = 'wpe',
	}

	export type Sites = { [siteID: string]: Site };

	export class SitePaths {
		site: Site;

		constructor(site: Site);

		readonly app: string;

		readonly sql: string;

		readonly webRoot: string;

		readonly conf: string;

		readonly confTemplates: string;

		readonly logs: string;

		readonly runData: string;
	}

	type LoggingLevel = 'warn' | 'info' | 'error' | 'debug' | 'verbose' | null;

	export interface IProcessOpts {
		name: string;
		binPath: string;
		args: string[];
		env?: NodeJS.ProcessEnv;
		cwd?: string;
		stdioLogging?: {
			stdout: LoggingLevel;
			stderr: LoggingLevel;
		};
		onError?: (stderr: string) => void;
		autoRestartTryTimeout?: number;
		autoRestartMaxTries?: number;
	}

	export function isWindows32Bit () : boolean;

	/**
	 * Site banner interface that can be displayed using the 'showSiteBanner' IPC event
	 */
	export interface SiteBanner {
		siteID: string | 'router';
		id: string;
		title?: string;
		message?: string;
		icon?: 'warning';
		variant?: 'warning' | 'neutral' | 'success' | 'error';
		buttonText?: string;
		buttonOnClickIPCEvent?: string;
		dismissible?: boolean;
		persistDismiss?: boolean;
		linkText?: string;
		linkOnClickIPCEvent?: string;
		linkHref?: string;
	}

	export interface AddonPackage {
		addonDir: string;
		author: { name: string };
		bgColor: string;
		bugs?: { url: string };
		bundledDependencies: string[];
		dependencies: {[key: string]: string};
		description: string;
		devDependencies?: {[key: string]: string};
		engines: {[key: string]: string};
		icon: string;
		keywords: string[];
		license: string;
		local: { hidden: boolean };
		main?: string;
		name: string;
		npmPackageName?: string;
		peerDependencies?: {[key: string]: string};
		productName: string;
		renderer?: string;
		repository: {[key: string]: string};
		scripts?: {[key: string]: string};
		slug: string;
		version: string;
	}

	export interface ReleaseManifest {
		url: string;
		name: string;
		notes: string;
		changelogUrl: string;
		pub_date: string;
		size: string;
		version: string;
	}

}
