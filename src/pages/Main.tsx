import { Link } from "react-router-dom";
import styled from "styled-components";
//@ts-ignore
import cameraImage from "../assets/images/camera.png";
//@ts-ignore
import photobookImage from "../assets/images/photobook.png";

function Main() {
	return (
		<Wrapper>
			<TitleWrapper>
				<Title>🧑‍🎄 메리 크리스마스!</Title>
				<Description>**이불 밖은 위험해** 공휴일은 집에서 즐기는 걸로..</Description>
			</TitleWrapper>
			<CardWrapper>
				<Link to="/takephoto">
					<Card>
						<ImageWrapper>
							<img src={cameraImage} alt="카메라" />
						</ImageWrapper>
						<CardTitle>사진 촬영</CardTitle>
					</Card>
				</Link>
				<Link to="/photobook">
					<Card>
						<ImageWrapper>
							<img src={photobookImage} alt="사진첩" />
						</ImageWrapper>
						<CardTitle>사진첩</CardTitle>
					</Card>
				</Link>
			</CardWrapper>
		</Wrapper>
	);
}

export default Main;

const Card = styled.section`
	width: 300px;
	height: 400px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 25px;
	background-color: #fff;
	border-radius: 10px;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
	text-decoration: none;
	transition: 0.2s all;
	&:hover {
		font-weight: bold;
		transform: translateY(-10px);
	}
`;

const ImageWrapper = styled.div`
	width: 150px;
	height: 150px;
	border-radius: 50%;
	overflow: hidden;
	background-color: #bcd4c3;
	padding: 20px;
	img {
		width: 100%;
		height: 100%;
	}
`;

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const TitleWrapper = styled.div`
	color: #fff;
	margin-bottom: 20px;
`;

const Title = styled.h1`
	font-size: 50px;
	font-weight: bold;
`;

const Description = styled.p`
	margin-top: 3px;
	text-align: right;
`;

const CardWrapper = styled.div`
	display: flex;
	gap: 20px;
`;

const CardTitle = styled.h1`
	font-size: 25px;
	color: #333;
`;
