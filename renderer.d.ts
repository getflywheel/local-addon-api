declare module '@getflywheel/local/renderer' {
	import {
		DocumentNode,
		OperationVariables,
		QueryHookOptions,
		TypedDocumentNode,
		QueryResult,
		ApolloClient,
		NormalizedCacheObject,
		MutationHookOptions, MutationTuple,
	} from '@apollo/client';

	import { GenericObject } from '@getflywheel/local';

	import { FC, ReactNode } from 'react';

	export { default as gql } from 'graphql-tag';

	export { RouteComponentProps } from 'react-router-dom';

	type ReactNodeLike = ReactNode | string | number;

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

	export function useLocalQuery<TData = any, TVariables = OperationVariables>(
		query: DocumentNode | TypedDocumentNode<TData, TVariables>,
		options?: QueryHookOptions<TData, TVariables>,
	): QueryResult<unknown>;

	export function useLocalMutation<TData = any, TVariables = OperationVariables>(
		mutation: DocumentNode | TypedDocumentNode<TData, TVariables>,
		options?: MutationHookOptions<TData, TVariables>,
	): MutationTuple<any, any>;

	export function useLocalSitesSubs(
		subscribeToMore: any
	): void;
}
