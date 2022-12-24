import { useRecoilState } from "recoil";
import { showDate as showDateAtom } from "../../recoil";

function ShowDate() {
	const [showDate, setShowDate] = useRecoilState(showDateAtom);
	return (
		<label>
			날짜 표기
			<input type="checkbox" checked={showDate} onChange={(e) => setShowDate(e.target.checked)} />
		</label>
	);
}

export default ShowDate;
