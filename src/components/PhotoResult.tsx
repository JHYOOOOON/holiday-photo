import styled from "styled-components";
import Snowfall from "react-snowfall";

import Photo from "./Photo";
import OptionBox from "./OptionBox";

function PhotoResult() {
	return (
		<Wrapper id="photo-result">
			<Snowfall />
			<Photo />
			<OptionBox />
		</Wrapper>
	);
}

export default PhotoResult;

const Wrapper = styled.div`
	position: relative;
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 25px;
`;
