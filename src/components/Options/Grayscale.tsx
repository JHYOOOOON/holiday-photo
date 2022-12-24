import { useRecoilState } from "recoil";
import { isGrayscale as isGrayscaleAtom } from "../../recoil";

function Grayscale() {
	const [isGrayscale, setIsGrayscale] = useRecoilState(isGrayscaleAtom);
	return (
		<label>
			흑백
			<input
				type="checkbox"
				checked={isGrayscale}
				onChange={(e) => setIsGrayscale(e.target.checked)}
			/>
		</label>
	);
}

export default Grayscale;
