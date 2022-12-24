import { selector } from "recoil";

import { backgroundColor, fontColor, isGrayscale, showDate, text } from "./atom";

export const withPhotoStyle = selector({
	key: "selector/photoStyle",
	get: ({ get }) => ({
		backgroundColor: get(backgroundColor),
		fontColor: get(fontColor),
		isGrayscale: get(isGrayscale),
		showDate: get(showDate),
		text: get(text),
	}),
});
