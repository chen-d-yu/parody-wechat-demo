import { defineStore } from "pinia";

interface IState extends UniApp.GetSystemInfoResult {
	isIphoneX : boolean;
	isIos : boolean;
	dpr : number;
	indexPath : string;
	currentIndex : number;
}
type PickKey =
	| "windowHeight"
	| "windowWidth"
	| "safeArea"
	| "platform"
	| "devicePixelRatio"
	| "statusBarHeight"
	| "screenHeight"
	| "screenWidth"
	| "isIphoneX"
	| "isIos"
	| "dpr"
	| "indexPath"
	| "currentIndex";
export default defineStore("commonStore", {
	// other options
	state: () : Pick<IState, PickKey> => {
		return {
			windowHeight: 0,
			windowWidth: 0,
			safeArea: {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
				width: 0,
				height: 0,
			},
			platform: "",
			devicePixelRatio: 0,
			statusBarHeight: 0,
			screenHeight: 0,
			screenWidth: 0,
			isIphoneX: false,
			isIos: false,
			dpr: 0,
			indexPath: "",
			currentIndex: 1,
		};
	},
	actions: {
		updateValueByKey(key : keyof IState, value : any) {
			this[key] = value;
		},
	},
});