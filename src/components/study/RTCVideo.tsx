import React, { useRef, useEffect } from 'react';
import { css } from '@emotion/react';

interface RTCVideoProps {
  mediaStream: MediaStream | undefined;
  width?: number | string;
  height?: number | string;
}

const RTCVideo = ({ mediaStream, width, height }: RTCVideoProps) => {
  const viewRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!viewRef.current) return;
    viewRef.current.srcObject = mediaStream ? mediaStream : null;
  }, [mediaStream]);

  return (
    <div
      tw="flex flex-col items-center justify-center"
      css={css`
        height: 100%;
      `}
    >
      <video
        css={css`
          height: 100%;
        `}
        ref={viewRef}
        autoPlay
        muted
      ></video>
    </div>
  );
};

export default RTCVideo;
