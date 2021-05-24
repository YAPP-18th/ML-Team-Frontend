import React, { useCallback, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';
import * as cocossd from '@tensorflow-models/coco-ssd';
import { HAND_CONNECTIONS, Hands, Results } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { handDetection, smartPhoneDetection } from './userActionDetection';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';

interface RTCVideoProps {
  mediaStream: MediaStream | undefined;
  width?: number | string;
  height?: number | string;
}

const RTCVideo = ({ mediaStream }: RTCVideoProps) => {
  const canvasElementRef = useRef<HTMLCanvasElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);

  const onResults = useCallback(
    (results: Results) => {
      const canvasElement = canvasElementRef?.current;
      const canvasCtx = canvasElement?.getContext('2d');
      // console.log(canvasCtx, canvasElement);

      if (canvasCtx && canvasElement) {
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(
          results.image,
          0,
          0,
          canvasElement.width,
          canvasElement.height,
        );
        if (results.multiHandLandmarks) {
          for (const landmarks of results.multiHandLandmarks) {
            drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
              color: '#00FF00',
              lineWidth: 5,
            });
            drawLandmarks(canvasCtx, landmarks, {
              color: '#FF0000',
              lineWidth: 2,
            });
          }
        }
        canvasCtx?.restore();
      }
    },
    [canvasElementRef],
  );

  const loadModel = async function (video: HTMLVideoElement) {
    const coco = await cocossd.load();
    const hand = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });
    hand.setOptions({
      maxNumHands: 2,
      minDetectionConfidence: 0.85,
      minTrackingConfidence: 0.85,
    });

    if (video) {
      const camera = new Camera(video, {
        onFrame: async () => {
          if (video) {
            await hand.send({
              image: video,
            });
            await smartPhoneDetection(coco, video);
          }
        },
        width: 1280,
        height: 720,
      });

      hand.onResults((results: Results) => {
        handDetection(results);
        onResults(results);
      });
      await camera.start();
    }
  };

  useEffect(() => {
    // console.log(videoElementRef);
    if (videoElementRef?.current) {
      loadModel(videoElementRef.current);
    }
  }, [videoElementRef]);

  return (
    <div
      tw="flex flex-col items-center justify-center"
      css={css`
        height: 100%;
      `}
    >
      <video
        ref={videoElementRef}
        style={{
          position: 'relative',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
        }}
      />
      <canvas
        ref={canvasElementRef}
        style={{
          position: 'absolute',
          left: '0',
          top: '0',
          width: '1280px',
          height: '720px',
        }}
      />
    </div>
  );
};

export default RTCVideo;
