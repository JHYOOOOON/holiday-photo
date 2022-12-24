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
		<div>
			<Title>갤러리</Title>
			<Description>최대 10장까지 저장됩니다.</Description>
			<Maybe
				test={gallery.length === 0}
				truthy={<div>저장된 사진이 없습니다.</div>}
				falsy={
					<ul>
						{gallery.map((url) => (
							<img src={url} />
						))}
					</ul>
				}
			/>
		</div>
	);
}

export default PhotoBook;

const Title = styled.h1`
	font-size: 30px;
	font-weight: bold;
	color: #fff;
`;

const Description = styled.p`
	margin-top: 5px;
	color: #fff;
`;
