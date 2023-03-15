/* eslint-disable max-classes-per-file, @typescript-eslint/no-use-before-define */

declare module '@getflywheel/local/renderer' {
	import {
		ApolloClient,
		NormalizedCacheObject,
	} from '@apollo/client';

	import Local, { GenericObject } from '@getflywheel/local';
	import { FC, ReactNode } from 'react';
	import ReactRouter from 'react-router-dom';
	import { HooksMain } from '@getflywheel/local/main';

	export { default as gql } from 'graphql-tag';

	export { RouteComponentProps } from 'react-router-dom';

	type ReactNodeLike = ReactNode | string | number;

	export class HooksRenderer extends HooksMain {
		static deprecatedHooks: {
			content: {match: string | RegExp, replacement: string, version: string}[],
		};

		static addContent(hook: any, callback: any, priority?: number): void;

		static doContent(hook: any, ...args: any[]): any[];
	}

	export type RouterMode = 'standard' | 'localhost';

	export class RouterStore {
		mode: RouterMode;

		setMode(mode: RouterMode): void;
	}

	export class OfflineStore {
		offline: boolean;
	}

	export class FlywheelStore {
		// Global type FlywheelOwner
		user: any;

		authed: boolean;

		setAuthenticationStatus(authed: boolean): void;

		removeUser(): void;

		refreshFlyAPI(): Promise<void>;

		refreshFlyAPIThrottle(): any;
	}

	export interface SiteSettings extends Local.NewSiteInfo, Omit<Local.NewSiteDefaults, 'environment'> {}

	export interface CreateSiteStep {
		disabled?: boolean;
		key: string,
		path: string,
		name?: string,
		component?: React.ReactNode,
	}

	export interface CreateSiteRadioOption {
		[path: string]: {
			label: string;
			content: JSX.Element;
		}
	}

	export interface CreateSiteDefinition {
		name: string;
		option: {
			label: string;
			description: JSX.Element;
		};
		steps: CreateSiteStep[]
	}
	export class CreateSiteStore {
		siteSettings: SiteSettings;

		/**
		* Defines the options and steps associated with creating sites.
		* Initialized with site definitions that live in flywheel-local nested in the 'CreateSite' dir
		*/
		createSiteDefinitions: CreateSiteDefinition[];

		/**
		 * Specifies the radio block option selected on the main CreateSite page
		 *
		 * Defaults to the "add-site" flow
		 */
		selectedCreateSiteFlow: string;

		/**
		 * The selectedCreateSiteDefinition defines the next steps for a user in the CreateSite flow
		 */
		selectedCreateSiteDefinition: CreateSiteDefinition | undefined;

		/**
		* Build and filter the options for the CreateSite Radio Block
		*/
		createSiteRadioOptions: CreateSiteRadioOption;

		/**
		* Gives an array of steps with route fields associated with creating a site.
		*
		* Allows defaultSteps to be filtered via CreateSite:Steps filter
		*/
		createSiteSteps: CreateSiteStep[];

		resetDefaults(): void;

		updateSiteSettings(newSiteSettings: Partial<SiteSettings>): void;

		updateCreateSiteDefinitions(updatedSiteDefinitions: CreateSiteDefinition[]): void;

		updateSelectedCreateSiteFlow(flow: string): void;
	}

	export interface WPEAccountInfo {
		userId?: string
		wpeEmail?: string
		error?: string
	}
	export class WPEStore {
		/**
		 * SSH Fingerprint used to determine if a new SSH Key needs to be generated
		 * @see app/renderer/connect/wpengine/hooks/handleSSHKeyGeneration.ts:82
		 */
		sshFingerprint: string | null;

		/**
		 * SSH Public Key used to connect to WPE SSH Gateway
		 */
		sshPublicKey: string | null;

		/**
		 * Observable WPE Authentication status
		 */
		authed: boolean;

		/**
		 * Observable WPE Account ID
		 * Obtained from WPE CAPI client with valid username and password
		 */
		accountId: string | undefined;

		/**
		 * Class constructor
		 * Sets a listener for CAPI.AUTHED to update the authed observable
		 * Initializes the authed status on app lift
		 *
		 * @note the presence of an accountId means that a user/pass has authenticated with CAPI
		 */
		constructor();

		loadSSHFingerprint(): Promise<void>;

		loadSSHPublicKey(): Promise<void>;

		/**
		 * Is there an Account ID set or available from the main thread?
		 * Set the authed status accordingly
		 */
		initAuthStatus(): Promise<void>;

		/**
		 * @note It is possible an accountId is not provided
		 *   in this case do not set any authed status as truthy
		 *
		 * @param {string} accountId
		 */
		setAuthenticationStatus(accountInfo?: WPEAccountInfo): Promise<void>;

		removeUser(): Promise<void>;
	}

	export class HubStore {
		// Global type HubUser
		user: any;

		setUser(user: any): void;

		hasValidSeat: boolean;

		// Global type LocalSubscriptionSeat
		hubSeat: any;

		/**
		 * Log a user in
		 */
		login(): void;

		/**
		 * Log a user out
		 */
		logout(): Promise<void>;

		/**
		 * Helper to refresh Hub user access tokens from renderer process
		 */
		refreshHubAuth(): Promise<void>;
	}

	export enum BannerStoreDomain {
		ALL = 'all',
		SITEINFO = 'siteinfo',
		BLUEPRINTS = 'blueprints',
		MARKETPLACE = 'marketplace',
		CONNECT = 'connect',
		SELECTSITE = 'selectsite',
	}
	export interface IBanner {
		id: string,
		component: React.ReactNode | (() => JSX.Element),
		domain?: BannerStoreDomain,
	}

	export class BannerStore {
		banners: IBanner[];

		addBanner(banner: IBanner): void;

		removeBanner(bannerId: string): void;
	}

	type RecursivePartial<T> = {
		[P in keyof T]?: RecursivePartial<T[P]>;
	};
	export class RootStore {
		static getInstance(
			$mock: RecursivePartial<RootStore> | undefined,
			$prewipe: boolean,
			forceNewInstance: boolean,
		): RootStore;

		constructor(forceNewInstance: boolean);

		hasValidSeat: boolean;

		$router: RouterStore;

		// Todo: the types for the Connect stores run deep, setting to any here for now
		$connect: any;

		$offline: OfflineStore;

		$flywheel: FlywheelStore;

		// Todo: the types for the Connect stores run deep, setting to any here for now
		$magicSyncViewer: any;

		// Todo: typing SitesStore would be quite an endeavor
		$sites: any;

		$createSite: CreateSiteStore;

		$wpe: WPEStore;

		$hub: HubStore;

		$banner: BannerStore;
	}

	export interface AddonRendererContext {
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
		React: typeof React;
		ReactRouter: Partial<typeof ReactRouter>;
		events: {
			send: any;
		};
		storage: {
			get?: (defaultValue?: any) => void;
			set?: (value: any) => void;
		};
		store: RootStore
		hooks: typeof HooksRenderer;
	}

	/** Mobx data stores */
	export const $offline: {
		/** offline observable toggled based on user internet connection */
		offline: boolean,
	};

	export const $hub: {
		/** Current logged in user */
		user: HubUser;
		/** Set new user in mobx store */
		setUser: (user: HubUser | null) => void;
		/** login user */
		login: () => void;
		/** logout of Local Account */
		logout: () => void;
	};

	export interface ConfirmArgs {
		title: ReactNodeLike
		message?: ReactNodeLike
		messageBottom?: ReactNodeLike
		messageCheckbox?: ReactNodeLike
		checkboxLabel?: string
		buttonText?: string
		buttonDisabled?: boolean
		onSubmit?: (...any) => any
		cancelButtonText: string
		buttonClass: string
		topIcon: any
		topIconColor: any
		largeConfirmButtonText: string
		showBottomHr: boolean
	}

	/**
	 * Utility function to send an IPC event to the renderer thread and await either a success or error response and
	 * return it as a Promise.
	 *
	 * The channel will automatically be tokenized to ensure a response came from the expected request.
	 *
	 * @see LocalMain.addIpcAsyncListener()
	 */
	export function ipcAsync(channel: string, ...additionalArgs: any[]): Promise<any>;

	/**
	 * Utility function to send an IPC event to the renderer.
	 */
	export function sendIPCEvent(channel: string, ...args: any[]): void;

	export function confirm(args: ConfirmArgs): Promise<any>;

	interface MenuContentRowItem {
		/* The name of the row to render on the left hand side (left column) of the row */
		name: string;
		/* the component to render on the right hand side (right column) of the row */
		component: FC;
	}

	export interface PreferencesSection {
		/* The name to call the section. If this is omitted, a subheader will not be created */
		subHeader?: string;
		/* the single row item or list of row itmes to render in the section */
		rows: MenuContentRowItem | MenuContentRowItem[];
	}

	/**
	 * Interface describing the expected shape for a config object that adds a new item to the
	 * settings view via the 'preferencesMenuItems' filter hook
	 */
	export interface AddonSettingsItem {
		/* the sub path that the menu should be mounted under for React Router */
		path: string;
		/* the display name to show in the sidebar and title section of "Preferences" */
		displayName: string;
		/* The section, or sections to render */
		sections: FC | PreferencesSection[];
		/* the function to call on click of the apply button */
		onApply: () => void;
		/* additional props to pass to MenuContentRowItem(s) or the section override component */
		sectionsProps?: GenericObject;
	}

	/**
	 * GraphQL
	 */
	export const localApolloClient: ApolloClient<NormalizedCacheObject>;

	export function useLocalSitesSubs(
		subscribeToMore: any
	): void;
}
