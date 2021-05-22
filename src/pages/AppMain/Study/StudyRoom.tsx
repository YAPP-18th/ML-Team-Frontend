import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom'; //npm install react-router-dom
import { useMediaQuery } from 'react-responsive';
import 'twin.macro';

import RTCVideo from '@components/Study/RTCVideo';
import StudyInfoBar from '@components/Study/StudyInfoBar';
import { StudyLayout } from '@components/Layouts/study/StudyLayout';

interface IStudyInfoBarProps {
  status: string;
}

export const StudyRoom = ({ history }: RouteComponentProps) => {
  const [localStream, setLocalStream] = useState<MediaStream>();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      setLocalStream(stream);
    });
  }, []);

  return (
    <StudyLayout history={history} page="studyroom">
      <RTCVideo tw="relative" mediaStream={localStream} />
      <ResponsiveStyledStudyInfoBar status={'상태표시'} />
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
