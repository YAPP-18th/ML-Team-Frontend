import React, { useRef, useEffect } from 'react';
import { css } from '@emotion/react';

interface RTCVideoProps {
  mediaStream: MediaStream | undefined;
  width: number | string;
}

const RTCVideo = ({ mediaStream, width }: RTCVideoProps) => {
  const viewRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!viewRef.current) return;
    viewRef.current.srcObject = mediaStream ? mediaStream : null;
  }, [mediaStream]);

  return (
    <div>
      <video width={width} ref={viewRef} autoPlay muted></video>
    </div>
  );
};

export default RTCVideo;
