import styled from "styled-components";
import { Reset } from "styled-reset";
import Snowfall from "react-snowfall";
import Router from "./Router";

function App() {
	return (
		<StyledApp id="app">
			<Reset />
			<Router />
			<Snowfall />
			<Snow>
				<StackedSnow />
			</Snow>
		</StyledApp>
	);
}

export default App;

const StyledApp = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	overflow: auto;
	background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
	filter: drop-shadow(0 0 10px white);
`;

const Snow = styled.div`
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 170px;
	overflow: hidden;
`;

const StackedSnow = styled.div`
	position: absolute;
	top: 120px;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #ffffff;
	transform: scale(1.2);
	filter: blur(20px);
`;
