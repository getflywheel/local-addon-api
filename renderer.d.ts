declare module '@getflywheel/local/renderer' {

	import { ReactNode } from 'react';

	type ReactNodeLike = ReactNode | string | number;

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

	export function confirm(args: ConfirmArgs): Promise<any>;

}
