import { GriffelStyle } from '@fluentui/react-components';

// Implementations of responsive breakpoints via https://github.com/microsoft/fluentui/issues/24289

type BreakpointFunction = (styles: GriffelStyle) => Record<string, GriffelStyle>;

interface IBreakpoints {
	/**
	 * X-Small devices (portrait phones, less than 576px).
	 *
	 * @type {BreakpointFunction}
	 * @memberof IBreakpoints
	 */
	xs: BreakpointFunction;
	/**
	 * Small devices (landscape phones, less than 768px).
	 *
	 * @type {BreakpointFunction}
	 * @memberof IBreakpoints
	 */
	sm: BreakpointFunction;
	/**
	 * Medium devices (tablets, less than 992px).
	 *
	 * @type {BreakpointFunction}
	 * @memberof IBreakpoints
	 */
	md: BreakpointFunction;
	/**
	 * Large devices (desktops, less than 1200px).
	 *
	 * @type {BreakpointFunction}
	 * @memberof IBreakpoints
	 */
	lg: BreakpointFunction;
	/**
	 * X-Large devices (large desktops, less than 1400px).
	 *
	 * @type {BreakpointFunction}
	 * @memberof IBreakpoints
	 */
	xl: BreakpointFunction;
}

const breakpoints: IBreakpoints = {
	xs: (style) => {
		return { '@media screen and (max-width: 575.98px)': style };
	},
	sm: (style) => {
		return {
			'@media screen and (min-width: 576px) and (max-width: 767.98px)': style
		};
	},
	md: (style) => {
		return {
			'@media screen and (min-width: 768px) and (max-width: 991.98px)': style
		};
	},
	lg: (style) => {
		return {
			'@media screen and (min-width: 992px) and (max-width: 1154.98px)': style
		};
	},
	xl: (style) => {
		return {
			'@media screen and (min-width: 1155px) and (max-width: 1399.98px)': style
		};
	}
};

export default breakpoints;
