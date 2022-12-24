import { atom } from "recoil";

export const photoUrl = atom<string>({
	key: "atom/photoUrl",
	default: "",
});

export const backgroundColor = atom<string>({
	key: "atom/backgroundColor",
	default: "#ffffff",
});

export const fontColor = atom<string>({
	key: "atom/fontColor",
	default: "#000000",
});

export const isGrayscale = atom<boolean>({
	key: "atom/grayscale",
	default: false,
});

export const showDate = atom<boolean>({
	key: "atom/showDate",
	default: true,
});

export const text = atom<string>({
	key: "atom/text",
	default: "༶･･𝑴𝒆𝒓𝒓𝒚 𝑪𝒉𝒓𝒊𝒔𝒕𝒎𝒂𝒔･･༶",
});
