import html2canvas from "html2canvas";
import styled, { css } from "styled-components";

import { BackgroundColor, FontColor, Grayscale, ShowDate, Text } from "./Options";

function OptionBox() {
	const downloadImage = (url: string) => {
		const link = document.createElement("a");
		link.download = "download";
		link.href = url;
		document.body.appendChild(link);
		link.click();
		link.remove();
	};

	const handleSave = async () => {
		const target = document.getElementById("photo") as HTMLDivElement;
		const options = {
			logging: false,
			imageTimeout: 1000,
			useCORS: true,
			width: target.offsetWidth,
			height: target.offsetHeight,
		};
		const canvas = await html2canvas(target, options);
		const url = canvas.toDataURL("image/png");
		const gallery = localStorage.getItem("gallery");
		let list;
		if (gallery) {
			list = JSON.parse(gallery);
			if (list.length === 8) {
				list.pop();
			}
			list.unshift(url);
		} else {
			list = [url];
		}
		localStorage.setItem("gallery", JSON.stringify(list));
		downloadImage(url);
	};

	return (
		<OptionWrapper>
			<OptionTitle>🎄 스타일</OptionTitle>
			<OptionDescription>스타일을 수정하고 저장해보세요!</OptionDescription>
			<BackgroundColor />
			<FontColor />
			{/* <Grayscale /> */}
			<ShowDate />
			<Text />
			<SaveButton onClick={handleSave}>저장하기</SaveButton>
			<a href="#photo-box">
				<CancelButton>다시찍기</CancelButton>
			</a>
		</OptionWrapper>
	);
}

export default OptionBox;

const OptionTitle = styled.h2`
	font-size: 22px;
	font-weight: bold;
	margin-bottom: 5px;
`;

const OptionDescription = styled.p`
	font-size: 14px;
	margin-bottom: 15px;
	color: #555;
`;

const OptionWrapper = styled.div`
	width: 300px;
	display: flex;
	flex-direction: column;
	padding: 25px 25px;
	background-color: #fff;
	border-radius: 10px;
	box-sizing: border-box;

	label {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
		word-break: keep-all;
		&:last-child {
			margin-bottom: 0;
		}
		input {
			margin-left: 7px;
			&[type="color"] {
				width: 25px;
				border: none;
				appearance: none;
				-moz-appearance: none;
				-webkit-appearance: none;
				background: none;
				border: none;
				padding: 0;
				cursor: pointer;
			}
			&[type="checkbox"] {
				width: 18px;
				height: 18px;
			}
			&[type="text"] {
				width: 100%;
			}
		}
	}
`;

const Button = css`
	width: 100%;
	height: 35px;
	border-radius: 5px;
	border: none;
	font-size: 16px;
	transition: 0.1s background-color;
	cursor: pointer;
`;

const SaveButton = styled.button`
	${Button}
	margin-top: 14px;
	background-color: #bcd4c3;
	&:hover {
		background-color: #a8bdae;
	}
`;

const CancelButton = styled.button`
	${Button}
	margin-top: 5px;
	background-color: #daa9a9;
	&:hover {
		background-color: #ba9090;
	}
`;
