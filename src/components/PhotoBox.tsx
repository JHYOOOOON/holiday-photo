import { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { withPhotoUrl } from "../recoil";
import { Device } from "../lib";

function PhotoBox() {
	const [stream, setStream] = useState<MediaStream | null>(null);
	const [isGranted, setIsGranted] = useState(false);
	const setPhotoUrl = useSetRecoilState(withPhotoUrl);
	const videoRef = useRef<HTMLVideoElement | null>(null);

	const updateStream = async (deviceId: string) => {
		const constraints = {
			video: {
				deviceId,
				width: 1280,
				height: 720,
			},
		};
		const newStream = await navigator.mediaDevices.getUserMedia(constraints);
		setStream(newStream);
	};

	useEffect(() => {
		(async () => {
			await Device.instance.initialize();
			const videoDevices = Device.instance.videoList;
			if (videoDevices.length > 0) {
				if (Device.instance.cameraPermission === "prompt") {
					await navigator.mediaDevices.getUserMedia({ video: true });
				}
				if (Device.instance.cameraPermission !== "granted") return;
				updateStream(videoDevices[0].deviceId);
			} else {
				alert("⛄️ 카메라 장치를 연결 후, 새로고침 해주세요");
			}
		})();
	}, []);

	useEffect(() => {
		if (!stream || !videoRef.current) return;
		videoRef.current.srcObject = stream;
	}, [stream]);

	useEffect(() => {
		setIsGranted(Device.instance.cameraPermission === "granted");
	}, [Device.instance.cameraPermission]);

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

		window.location.href = "#photo-result";
	};

	return (
		<Wrapper id="photo-box">
			<TitleWrapper>
				<Title>사진 촬영</Title>
				<Description>사진을 찍고 결과를 확인해보세요!</Description>
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
	);
}

export default PhotoBox;

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
	margin-top: 5px;
	color: #fff;
`;

const VideoWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 390px;
`;

const NoPermission = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	max-width: 700px;
	height: 100%;
	background-color: #fff;
	font-size: 18px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const StyledVideo = styled.video`
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
