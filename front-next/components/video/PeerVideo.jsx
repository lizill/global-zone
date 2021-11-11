import React, { useEffect, useRef, useState } from 'react';

const Video = ({ name, stream, muted }) => {
	const ref = useRef(null);
	const [isMuted, setIsMuted] = useState(false);

	useEffect(() => {
		if (ref.current) ref.current.srcObject = stream;
		if (muted) setIsMuted(muted);
	}, [stream, muted]);

	return (
		<div>
			<video ref={ref} muted={isMuted} autoPlay />
		</div>
	);
};

export default Video;
