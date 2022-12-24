import { useRecoilState } from "recoil";
import { text as textAtom } from "../../recoil";

function Text() {
	const [text, setText] = useRecoilState(textAtom);
	return (
		<label>
			문구
			<input type="text" value={text} onChange={(e) => setText(e.target.value)} />
		</label>
	);
}

export default Text;
