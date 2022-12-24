import styled from "styled-components";
import { Reset } from "styled-reset";
import Snowfall from "react-snowfall";

function App() {
	return (
		<StyledApp id="app">
			<Reset />
			<Snowfall />
		</StyledApp>
	);
}

export default App;

const StyledApp = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: #333;
`;
