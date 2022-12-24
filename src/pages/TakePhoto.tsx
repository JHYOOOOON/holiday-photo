import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

function TakePhoto() {
	const [stream, setStream] = useState<MediaStream | null>(null);
	const [isGranted, setIsGranted] = useState(false);
	const [photoUrl, setPhotoUrl] = useState<string | null>(null);
	const videoRef = useRef<HTMLVideoElement | null>(null);

	useEffect(() => {
		const getCameraPermission = async () => {
			//@ts-ignore
			const { state } = await navigator.permissions.query({ name: "camera" });
			setIsGranted(state === "granted");
			return state;
		};

		(async () => {
			const devices = await navigator.mediaDevices.enumerateDevices();
			const videoDevices = devices.filter((item) => item.kind === "videoinput");

			if (videoDevices.length > 0) {
				const stateForCheckPermission = await getCameraPermission();
				if (stateForCheckPermission === "prompt") {
					/* check permissions */
					await navigator.mediaDevices.getUserMedia({ video: true });
				}

				const stateForGetVideoSource = await getCameraPermission();
				if (stateForGetVideoSource === "granted") {
					const constraints = {
						video: {
							deviceId: videoDevices[0].deviceId,
							width: 1280,
							height: 720,
						},
					};
					const newStream = await navigator.mediaDevices.getUserMedia(constraints);
					setStream(newStream);
				}
			} else {
				alert("⛄️ 카메라 장치를 연결 후, 새로고침 해주세요");
			}
		})();
	}, []);

	useEffect(() => {
		if (!stream || !videoRef.current) return;
		videoRef.current.srcObject = stream;
	}, [stream]);

	const takePhoto = async () => {
		if (!videoRef.current) return;
		if (isGranted === false) return;

		document.getElementById("canvas") && document.getElementById("canvas")?.remove();
		const canvas = document.createElement("canvas") as HTMLCanvasElement;
		canvas.style.position = "fixed";
		canvas.style.zIndex = "-10";
		canvas.id = "canvas";
		canvas.width = videoRef.current.offsetWidth;
		canvas.height = videoRef.current.offsetHeight;
		document.body.appendChild(canvas);

		const context = canvas.getContext("2d") as CanvasRenderingContext2D;
		context.scale(-1, 1);
		context.translate(canvas.width * -1, 0);

		context.drawImage(
			videoRef.current,
			0,
			0,
			videoRef.current.offsetWidth,
			videoRef.current.offsetHeight
		);
		canvas.toBlob((blob) => {
			if (!blob) return;
			const url = URL.createObjectURL(blob);
			setPhotoUrl(url);
		});
	};

	return (
		<div>
			<Wrapper>
				<TitleWrapper>
					<Title>사진 촬영</Title>
					<Description>사진을 찍고 결과를 확인하세요</Description>
				</TitleWrapper>
				<VideoWrapper id="photo-target">
					{isGranted === false && (
						<NoPermission>
							<p>브라우저에서 카메라 권한을 허용해주세요 ⛄️</p>
						</NoPermission>
					)}
					<StyledVideo ref={videoRef} autoPlay playsInline muted />
				</VideoWrapper>
				<Button onClick={takePhoto} disabled={isGranted === false}>
					사진 찍기
				</Button>
			</Wrapper>
			{photoUrl && (
				<PhotoWrapper>
					<ImageArea>
						<ImageColor />
						<Image src={photoUrl} />
					</ImageArea>
					<TextArea>
						<p>22.12.24</p>
						<p>༶･･𝑴𝒆𝒓𝒓𝒚 𝑪𝒉𝒓𝒊𝒔𝒕𝒎𝒂𝒔･･༶</p>
					</TextArea>
				</PhotoWrapper>
			)}
		</div>
	);
}

export default TakePhoto;

const Wrapper = styled.div`
	width: 100%;
	height: 100vh;
	max-width: 700px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
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
	margin-top: 3px;
	color: #fff;
`;

const VideoWrapper = styled.div`
	position: relative;
	width: 700px;
	height: 390px;
`;

const NoPermission = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #fff;
	font-size: 18px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const StyledVideo = styled.video`
	width: 100%;
	height: 100%;
	transform: rotateY(180deg);
`;

const Button = styled.button`
	background-color: #bcd4c3;
	padding: 10px 13px;
	font-size: 16px;
	border: none;
	border-radius: 7px;
	margin-top: 20px;
	cursor: pointer;
	transition: 0.1s background-color;
	&::before {
		content: "📷";
		margin-right: 5px;
	}
	&:disabled {
		background-color: #999;
	}
	&:hover {
		background-color: #a8bdae;
		&::before {
			content: "📸";
			margin-right: 5px;
		}
	}
`;

const PhotoWrapper = styled.div`
	width: 380px;
	height: 280px;
	background-color: #fff;
	padding: 25px 0;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
`;

const ImageArea = styled.div`
	position: relative;
	margin: 0 auto;
	width: 350px;
	height: 195px;
	margin-bottom: 10px;
`;

const ImageColor = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	backdrop-filter: grayscale(30%);
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
`;

const TextArea = styled.div`
	width: 350px;
	display: flex;
	flex-direction: column;
	text-align: right;
	margin: auto;
`;
