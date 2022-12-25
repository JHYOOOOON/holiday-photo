import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Maybe from "../components/Maybe";

function PhotoBook() {
	const [gallery, setGallery] = useState([]);

	useEffect(() => {
		const list = localStorage.getItem("gallery");
		if (list) {
			setGallery(JSON.parse(list));
		}
	}, []);

	return (
		<Wrapper>
			<TitleWrapper>
				<Title>갤러리</Title>
				<Description>최대 8장까지 저장됩니다.</Description>
			</TitleWrapper>
			<Maybe
				test={gallery.length === 0}
				truthy={<div>저장된 사진이 없습니다.</div>}
				falsy={
					<PhotoWrapper>
						{gallery.map((url) => (
							<img src={url} />
						))}
					</PhotoWrapper>
				}
			/>
		</Wrapper>
	);
}

export default PhotoBook;

const Wrapper = styled.div`
	max-width: calc(200px * 3 + 15px * 2);
	width: 100%;
	height: 100%;
	margin: 0 auto;
	padding-top: 100px;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-sizing: border-box;
`;

const TitleWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;
`;

const Title = styled.h1`
	font-size: 30px;
	font-weight: bold;
	color: #fff;
`;

const Description = styled.p`
	margin-top: 5px;

	color: #fff;
`;

const PhotoWrapper = styled.ul`
	display: grid;
	grid-template-columns: repeat(3, 200px);
	gap: 15px;
	img {
		width: 100%;
	}
`;
