import { useRecoilValue } from "recoil";
import styled, { css } from "styled-components";

import { withPhotoStyle, withPhotoUrl } from "../recoil";

function Photo() {
	const photoUrl = useRecoilValue(withPhotoUrl);
	const photoStyle = useRecoilValue(withPhotoStyle);

	const formatDate = (date: number) => (date < 10 ? `0${date}` : `${date}`);

	const getTime = () => {
		const date = new Date();
		return `${date.getFullYear().toString().substring(2)}.${formatDate(
			date.getMonth() + 1
		)}.${formatDate(date.getDate())}`;
	};

	return (
		<PhotoWrapper id="photo" backgroundColor={photoStyle.backgroundColor}>
			<ImageArea>
				<ImageColor isGrayscale={photoStyle.isGrayscale} />
				<Image src={photoUrl} />
			</ImageArea>
			<TextArea fontColor={photoStyle.fontColor}>
				{photoStyle.showDate && <p>{getTime()}</p>}
				<p>{photoStyle.text}</p>
			</TextArea>
		</PhotoWrapper>
	);
}

export default Photo;

const PhotoWrapper = styled.div<{ backgroundColor: string }>`
	width: 380px;
	height: 280px;
	padding: 25px 0;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	${({ backgroundColor }) =>
		css`
			background-color: ${backgroundColor};
		`}
`;

const ImageArea = styled.div`
	position: relative;
	margin: 0 auto;
	width: 350px;
	height: 195px;
	margin-bottom: 10px;
`;

const ImageColor = styled.div<{ isGrayscale: boolean }>`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	${({ isGrayscale }) => {
		if (isGrayscale) {
			return css`
				backdrop-filter: grayscale(90%) brightness(110%) saturate(110%);
			`;
		} else {
			return css`
				backdrop-filter: grayscale(20%) brightness(110%) saturate(110%);
			`;
		}
	}}
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
`;

const TextArea = styled.div<{ fontColor: string }>`
	width: 350px;
	display: flex;
	flex-direction: column;
	text-align: right;
	margin: auto;
	${({ fontColor }) =>
		css`
			color: ${fontColor};
		`}
`;
