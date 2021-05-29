import React, { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import 'twin.macro';
import { css } from '@emotion/react';

import RTCVideo from '@components/Study/RTCVideo';
import StudyInfoBar from '@components/Study/StudyInfoBar';
import { StudyLayout } from '@components/Layouts/study/StudyLayout';
import { ICurrentStudy } from '@pages/AppMain/Study/Study';

import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';
import * as cocossd from '@tensorflow-models/coco-ssd';
import { HAND_CONNECTIONS, Hands, Results } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import {
  handDetection,
  smartPhoneDetection,
} from '@components/Study/userActionDetection';
import { userHandDetection } from '@components/Study/userHandDetection';
import { Spin, Space } from 'antd';

interface IStudyInfoBarProps {
  status: string;
}

interface IStudyRoomProps {
  currentStudy?: ICurrentStudy;
  isPublic: boolean;
}

export const StudyRoom = ({ currentStudy, isPublic }: IStudyRoomProps) => {
  const [loading, setLoading] = useState(true);
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const [curAction, setCurAction] = useState('공부중');
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [sets, setSets] = useState<number>(1);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      setLocalStream(stream);
    });
  }, []);

  const loadModel = async function (video: HTMLVideoElement) {
    setLoading(true);
    const coco = await cocossd.load();
    const hand = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });
    hand.setOptions({
      //성능조절
      maxNumHands: 2, //손 인식 개수
      minDetectionConfidence: 0.85, // 높을수록 모델 정확도 향상
      minTrackingConfidence: 0.1, // 높을수록 속도저하, 모델 정확도 향상
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
        width: 480,
        height: 320,
      });

      hand.onResults((results: Results) => {
        const prevAction = curAction;
        setCurAction(handDetection(results));
        if (prevAction !== curAction) console.log(new Date().getTime());
        // onResults(results);
      });
      await camera.start();
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log(videoElementRef);
    if (videoElementRef?.current) {
      loadModel(videoElementRef.current);
    }
  }, [videoElementRef]);

  return (
    <StudyLayout isPublic={isPublic} page="studyroom">
      <div
        tw="flex flex-col items-center justify-center"
        css={css`
          height: 100%;
        `}
      >
        {loading == true && (
          <div
            css={css`
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              //
            `}
          >
            <Spin size="large" />
          </div>
        )}

        <video
          ref={videoElementRef}
          muted
          css={css`
            height: 100%;
            // width: 100%;
          `}
        />
      </div>
      <ResponsiveStyledStudyInfoBar
        status={curAction}
        // sets={sets}
        // setSets={setSets}
      />
    </StudyLayout>
  );
};

const ResponsiveStyledStudyInfoBar = (props: IStudyInfoBarProps) => {
  const isLarge = useMediaQuery({ minWidth: 965 });
  return isLarge ? (
    <StudyInfoBar status={props.status} isLarge={true} />
  ) : (
    <StudyInfoBar status={props.status} isLarge={false} />
  );
};
