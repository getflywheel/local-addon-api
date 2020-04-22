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

	function confirm(args: ConfirmArgs): Promise<any>;

}
