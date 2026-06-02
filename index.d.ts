declare module '@getflywheel/local' {
	import * as LocalGraphQL from '@getflywheel/local/graphql';

	export type GenericObject = { [key: string]: any };

	export type FunctionGeneric = (...params: any[]) => any;

	/**
	 * NOTE: all enum declarations must be copied over to `index.d.ts` as well.
	 */

	/**
	 * Re-exporting this here, it's also in main. Needed in a shared helper, but accessing main enums from the renderer
	 * errors out, since enums import from the typescript file, not the declaration file, and webpack gets confused.
	 *
	 * Possible TODO: remove this enum from main.d.ts - however, that would require a bump to any add-ons that access
	 * this type. For now that looks like it's just the Atlas add-on.
	 */
	export enum LightningServicePlatform {
		DarwinArm64 = 'darwin-arm64',
		Darwin = 'darwin',
		Win32 = 'win32',
		Win32x64 = 'win64',
		Linux = 'linux',
	}

	export enum MultiSite {
		No = '',
		Subdir = 'ms-subdir',
		Subdomain = 'ms-subdomain',
	}

	export enum SiteServiceType {
		LIGHTNING = 'lightning',
	}

	export enum SiteServiceRole {
		HTTP = 'http',
		DATABASE = 'db',
		PHP = 'php',
		FRONTEND = 'frontend',
		OTHER = 'other',
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
	 * The human readable name of a Local site. Can include spaces.
	 *
	 * A site name used within the Local UI and as a source for deriving things like a site path or site domain.
	 *
	 * @example "Vinyl Destination"
	 * @example "Larry's Web Shoppe"
	 */
	type SiteName = string;

	/**
	 * Commonly used arguments for site creation (new site, pulling, importing, etc).
	 */
	export interface NewSiteInfo {
		siteName: string;
		sitePath: string;
		siteDomain: string;
		multiSite: LocalGraphQL.MultiSite;
		phpVersion?: string;
		database?: string;
		environment?: string;
		blueprint?: string;
		webServer?: string;
		customOptions?: GenericObject;
		xdebugEnabled?: boolean;
	}

	/**
	 * The Lightning Services of the site
	 *
	 * @example
	 *   {
	 *     "php": {
	 *       "name": "php",
	 *       "version": "8.2.27",
	 *       ...
	 *      },
	 *      "nginx": {
	 *        "name": "nginx",
	 *        "version": "1.26.1",
	 *        ...
	 *      },
	 *      "mysql": {
	 *        "name": "mysql",
	 *        "version": "8.0.35",
	 *        ...
	 *      },
	 *      ...
	 *   }
	 */
	export type SiteServices = { [serviceName: string]: SiteService };

	export type SitePort = number;
	export type SiteStatus = LocalGraphQL.SiteStatus;

	/**
	 * A JSON representation of a site.
	 *
	 * SiteJSON has a fairly wide interface because it represents many
	 * of the properties that used to exist on a site and which are
	 * saved to the disk in the userData folder. Many of these
	 * properties made sense when Local used docker and exist as
	 * deprecated properites to document some of the things you might
	 * encounter when working with old site data.
	 */
	export interface SiteJSON
		extends Omit<
			LocalGraphQL.Site,
			| 'services'
			| 'hostConnections'
			| 'status'
			| 'workspace'
			| 'paths'
			| 'longPath'
			| 'url'
			| 'host'
		> {
		services: SiteServices;

		hostConnections?: LocalGraphQL.Site['hostConnections'] | null;

		workspace?: LocalGraphQL.Site['workspace'] | null;

		customOptions?: GenericObject;

		/**
		 * @deprecated
		 */
		flywheelConnect?: string;

		/**
		 * @deprecated
		 */
		sslSHA1?: string;

		/**
		 * @deprecated
		 */
		clonedImage?: string;

		/**
		 * @deprecated
		 */
		devMode?: boolean;

		/**
		 * @deprecated
		 */
		container?: string;

		/**
		 * @deprecated
		 */
		phpVersion?: string;

		/**
		 * @deprecated
		 */
		mysqlVersion?: string;

		/**
		 * @deprecated
		 */
		webServer?: string;

		/**
		 * @deprecated
		 */
		database?: string;

		/**
		 * @deprecated
		 *
		 * The original shape looked something like:
		 * @example
		 *     ports?: {
		 *       HTTP?: SitePort,
		 *       MYSQL?: SitePort,
		 *       PHP?: SitePort | SitePort[],
		 *       MAILHOG_WEB?: SitePort,
		 *       MAILHOG_SMTP?: SitePort,
		 *       [portName: string]: SitePort | SitePort[]
		 *     }
		 */
		ports?: { [portName: string]: SitePort | SitePort[] };

		/**
		 * The environment for the site to use.
		 *
		 * Local still has a concept of "preferred" vs "custom"
		 * environments, but this value relates to when Local used
		 * Docker and there were two different images in use:
		 * `flywheel` (preferred) and `custom`, which was a sort of
		 * dynamically provisioned collection of containers.
		 *
		 * @deprecated
		 */
		environment?: string;

		/**
		 * The environment version for the SiteJSON.environment
		 * setting.
		 *
		 * @deprecated
		 */
		environmentVersion?: string;
	}

	export type SitesJSON = { [siteID: string]: SiteJSON };

	/**
	 * This was done because we need the deprecated properties in SiteJSON along with some of the properties in SiteJSON
	 * such as services, hostConnections, and workspace that differ from the LocalGraphQL.Site type.
	 *
	 *
	 */
	type SiteBase = Omit<
		LocalGraphQL.Site,
		'services' | 'hostConnections' | 'workspace' | 'status'
	> &
		SiteJSON;

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

		getService(serviceName: string): SiteService;

		getSiteServiceByRole(role: SiteServiceRole): SiteService | undefined;

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

	export function isWindows32Bit(): boolean;

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

	export type SitesOrganization = { [siteId: string]: SiteOrganization };

	export interface AddonPackage {
		addonDir: string;
		author: { name: string };
		bgColor: string;
		bugs?: { url: string };
		bundledDependencies: string[];
		dependencies: { [key: string]: string };
		description: string;
		devDependencies?: { [key: string]: string };
		engines: { [key: string]: string };
		icon: string;
		keywords: string[];
		license: string;
		local: { hidden: boolean };
		main?: string;
		name: string;
		npmPackageName?: string;
		peerDependencies?: { [key: string]: string };
		productName: string;
		renderer?: string;
		repository: { [key: string]: string };
		scripts?: { [key: string]: string };
		slug: string;
		version: string;
	}

	/**
	 * A url pointing to a ReleaseManifest. Will be either the "latest" ReleaseManifest or a specific one.
	 *
	 * @example
	 * https://cdn.localwp.com/stable/updates.json
	 *
	 * @example
	 * https://cdn.localwp.com/releases-stable/9.2.3+6776/updates.json
	 */
	export type ReleaseManifestUrl = string;

	/**
	 * A url to a single PlatformReleaseManifest
	 *
	 * @example
	 * https://cdn.localwp.com/releases-stable/9.2.4+6788/release-mac-arm64.json
	 */
	export type PlatformReleaseManifestUrl = string;

	/**
	 * A collection of PlatformReleaseManifestUrls for various platforms of a specific release.
	 *
	 * This data represents a successful response from a ReleaseManifestUrl.
	 *
	 * @example
	 *     {
	 *       "darwin-x64-production": {
	 *         "update": "https://cdn.localwp.com/releases-stable/9.2.4+6788/release-mac.json"
	 *       },
	 *       "darwin-arm64-production": {
	 *         "update": "https://cdn.localwp.com/releases-stable/9.2.4+6788/release-mac-arm64.json"
	 *       },
	 *       "win32-x64-production": {
	 *         "update": "https://cdn.localwp.com/releases-stable/9.2.4+6788/release-windows.json"
	 *       },
	 *       "win32-ia32-production": {
	 *         "update": "https://cdn.localwp.com/releases-stable/9.2.4+6788/release-windows.json"
	 *       }
	 *     }
	 */
	export interface ReleaseManifest {
		[key: string]: {
			update: PlatformReleaseManifestUrl;
		};
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
	 * Release details for a specific platform and version of Local.
	 *
	 * @example
	 *     {
	 *       "url": "https://cdn.localwp.com/releases-stable/9.2.4+6788/local-9.2.4-mac-arm64.zip",
	 *       "name": "9.2.4",
	 *       "notes": "",
	 *       "changelogUrl": "https://localwp.com/releases/9.2.4/",
	 *       "pub_date": "2025-04-17T15:07:31Z",
	 *       "size": "",
	 *       "rollout": {
	 *         "rolloutPercentage": 25,
	 *         "autoUpdate": true
	 *       }
	 *     }
	 */
	export interface PlatformReleaseManifest {
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

	/**
	 * An individual WordPress translation pack
	 */
	export interface WPTranslation {
		/**
		 * The language slug for this translation
		 */
		language: string;

		/**
		 * The WordPress version this translation is for.
		 */
		version: string;

		/**
		 * Date the translation was last updated, in MySQL datetime format.
		 * For example: '2016-06-29 08:59:03'
		 */
		updated: string;

		/**
		 * English name of the language.
		 */
		english_name: string;

		/**
		 * Native name of the language.
		 */
		native_name: string;

		/**
		 * URL to download the translation package.
		 * For example: 'https://downloads.wordpress.org/translation/core/6.7/el.zip'
		 */
		package: string;

		/**
		 * Array of ISO 639 language codes.
		 *
		 * The shape will look something like:
		 *
		 *     "iso": {
		 *       "1": "dz",
		 *       "2": "dzo"
		 *     },
		 *
		 * - https://en.wikipedia.org/wiki/ISO_639
		 */
		iso: {
			[key: string]: string;
		};

		// Array of translated strings used in the installation process.
		strings: {
			[key: string]: string;
		};
	}

	/**
	 * A response from the WordPress.org Translation installation API.
	 *
	 * There's not much canonical info about this API endpoint, but
	 * these resources should help:
	 *
	 * - https://codex.wordpress.org/WordPress.org_API#Translations
	 * - https://developer.wordpress.org/reference/functions/translations_api/#return
	 */
	export interface WPTranslationsResponse {
		translations: WPTranslation[];
	}
}
