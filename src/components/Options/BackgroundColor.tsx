import { useRecoilState } from "recoil";
import { backgroundColor as backgroundColorAtom } from "../../recoil";

function BackgroundColor() {
	const [backgroundColor, setBackgroundColor] = useRecoilState(backgroundColorAtom);
	return (
		<label>
			배경색상
			<input
				type="color"
				value={backgroundColor}
				onChange={(e) => setBackgroundColor(e.target.value)}
			/>
		</label>
	);
}

export default BackgroundColor;
