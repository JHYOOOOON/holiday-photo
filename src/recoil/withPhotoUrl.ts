import { selector } from "recoil";
import { photoUrl } from "./atom";

export const withPhotoUrl = selector<string>({
	key: "selector/photoUrl",
	get: ({ get }) => get(photoUrl),
	set: ({ set }, newValue) => set(photoUrl, newValue),
});
