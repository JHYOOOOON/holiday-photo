import { useRecoilState } from "recoil";
import { fontColor as fontColorAtom } from "../../recoil";

function BackgroundColor() {
	const [fontColor, setFontColor] = useRecoilState(fontColorAtom);
	return (
		<label>
			문구색상
			<input type="color" value={fontColor} onChange={(e) => setFontColor(e.target.value)} />
		</label>
	);
}

export default BackgroundColor;
