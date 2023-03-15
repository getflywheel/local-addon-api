declare module '@getflywheel/local' {

	import * as LocalGraphQL from '@getflywheel/local/graphql';

	export type GenericObject = { [key: string]: any };

	export type FunctionGeneric = (...params: any[]) => any;

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
	}

	export enum SiteServiceRole {
		HTTP = 'http',
		DATABASE = 'db',
		PHP = 'php',
		FRONTEND = 'frontend',
		OTHER = 'other'
	}

	export enum AddonStatus {
		INSTALLED = 'installed',
		INSTALLING = 'installing',
		UNINSTALLED = 'uninstalled',
		UNINSTALLING = 'uninstalling',
		UPDATING = 'updating',
	}

	export type SiteService = LocalGraphQL.SiteService;

	export type NewSiteDefaults = {
		environment: string;
		adminEmail: string;
		sitesPath: string;
		tld: string;
	};
	/**
	 * Commonly used arguments for site creation (new site, pulling, importing, etc).
	 */
	export interface NewSiteInfo {
		siteName: string
		sitePath: string
		siteDomain: string
		multiSite: LocalGraphQL.MultiSite
		phpVersion?: string
		database?: string
		environment?: string
		blueprint?: string
		webServer?: string
		customOptions?: GenericObject
		xdebugEnabled?: boolean
	}

	export type SiteServices = { [serviceName: string]: SiteService };

	export type SitePort = number;
	export type SiteStatus = LocalGraphQL.SiteStatus;

	export interface SiteJSON extends Omit<
	LocalGraphQL.Site,
	'services'
	| 'hostConnections'
	| 'status'
	| 'workspace'
	| 'paths'
	| 'longPath'
	| 'url'
	| 'host'
	> {
		services: { [serviceName: string]: LocalGraphQL.SiteService };

		hostConnections?: LocalGraphQL.Site['hostConnections'] | null;

		workspace?: LocalGraphQL.Site['workspace'] | null;

		customOptions?: GenericObject;

		/* Deprecated */
		flywheelConnect?: string
		sslSHA1?: string
		clonedImage?: string
		devMode?: boolean
		container?: string
		phpVersion?: string
		mysqlVersion?: string
		webServer?: string
		database?: string
		ports?: { [portName: string]: SitePort | SitePort[] }
		environment?: string
		environmentVersion?: string
	}

	export type SitesJSON = { [siteID: string]: SiteJSON };

	/**
	 * This was done because we need the deprecated properties in SiteJSON along with some of the properties in SiteJSON
	 * such as services, hostConnections, and workspace that differ from the LocalGraphQL.Site type.
	 */
	type SiteBase = Omit<LocalGraphQL.Site,
	'services' |
	'hostConnections' |
	'workspace' |
	'status'> & SiteJSON;

	export class Site implements SiteBase {
		id: string;

		path: string;

		localVersion: string;

		services: SiteJSON['services'];

		multiSite: SiteJSON['multiSite'];

		multiSiteDomains: SiteJSON['multiSiteDomains'];

		customOptions?: GenericObject | undefined;

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

		liveLinkSettings?: SiteJSON['liveLinkSettings'];

		paths: {
			readonly app: string;

			readonly sql: string;

			readonly webRoot: string;

			readonly conf: string;

			readonly confTemplates: string;

			readonly logs: string;

			readonly runData: string;
		};

		oneClickAdminID?: number;

		oneClickAdminDisplayName?: string;

		xdebugEnabled?: boolean;

		/* Deprecated */
		flywheelConnect?: string;

		devMode?: boolean;

		container?: string;

		clonedImage?: string;

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

		getServices(): SiteService[];

		getService(serviceName: string) : SiteService;

		getSiteServiceByRole(role: SiteServiceRole) : SiteService | undefined;

		readonly longPath: string;

		readonly host: string;

		readonly url: string;

		readonly adminUrl: string;

		readonly httpPort: number | undefined;

		readonly frontendPort: number | undefined;

		readonly frontendHost: string;

		readonly frontendUrl: string;

		readonly backendUrl: string;
	}

	/**
	 * Represents a host connection with basic host and remote information.
	 */
	export type HostConnection = LocalGraphQL.HostConnection;

	/**
	 * Represents a unique identifier for each supported host.
	 */
	export enum HostId {
		FLYWHEEL = 'flywheel',
		WPE = 'wpe',
	}

	export type Sites = { [siteID: string]: Site };

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
		buttonOnClick?: FunctionGeneric;
		buttonOnClickIPCEvent?: string;
		dismissible?: boolean;
		persistDismiss?: boolean;
		linkText?: string;
		linkOnClick?: FunctionGeneric;
		linkHref?: string;
	}

	export interface SiteOrganization {
		isStarred: boolean;
		sortData?: {
			siteLastStartedTimestamp: number;
		};
	}

	export type SitesOrganization = {[siteId: string]: SiteOrganization};

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

	/**
 	 * This is the percentage of users that should update to this Local version.
 	 */
	export type RolloutPercentage = number;

	/**
	 * Set to true to have Local detect this version and prompt users to update automatically.
	 * Set to false to allow users to update manually.
 	 */
	export type AutoupdateEnabled = boolean;

	/**
	 * Local reads from this file to learn about a new Local release.
     */
	export interface ReleaseManifest {
		/**
		 * URL for the Local release zip.
	 	 */
		url: string;

		/**
		 * SemVer compatible Local version.
	 	 */
		name: string;

		/**
		 * SemVer compatible Local version.
		 */
		version?: string;

		/**
		 * Hand written notes about the release.
		 */
		notes?: string;

		/**
	 	 * A link to the public changelog for this release.
	 	 */
		changelogUrl: string;

		/**
	 	 * URL to hosted notes about this specific Local release. This page will be embedded into Local using an iframe.
	 	 */
		releaseNotesUrl?: string;

		/**
	 	 * The publish date for this release formatted as an ISO 8601 string.
	 	 */
		pub_date: string;

		/**
	 	 * Size in bytes of the Local update.
	 	 */
		size: string;

		rollout?: RolloutRules;
	}

	/**
	 * Properties in this object relate to gradually rolling out new Local versions with different rules.
	 */
	export interface RolloutRules {
		rolloutPercentage?: RolloutPercentage;
		autoUpdate?: AutoupdateEnabled;
	}

	/**
	 * Local reads this data from the Local Releases CMS.
	 */
	export interface ReleaseList {
		/**
		 * Name of the Local release, e.g. "Local 5.5.5".
		 */
		name: string;
		/**
		 * Local version.
		 */
		version: string;
		/**
		 * Build number from the build pipeline.
		 */
		build_number: number;
		/**
		 * "stable" or "beta"
		 */
		release_channel: string;
		/**
		 * Publish date of the release.
		 */
		pub_date: string;
		/**
		 * Text area containing the download links for each operating system.
		 */
		download_links: string;
		/**
		 * The release notes for this release.
		 */
		body: string;
	}

}
