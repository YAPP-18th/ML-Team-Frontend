import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom'; //npm install react-router-dom
import { useMediaQuery } from 'react-responsive';
import 'twin.macro';

import RTCVideo from '@components/Study/RTCVideo';
import StudyInfoBar from '@components/Study/StudyInfoBar';
import { StudyLayout } from '@components/Layouts/study/StudyLayout';
import { ICurrentStudy } from '@pages/AppMain/Study/Study';

interface IStudyInfoBarProps {
  status: string;
}

interface IStudyRoomProps {
  currentStudy?: ICurrentStudy;
}

export const StudyRoom = ({ currentStudy }: IStudyRoomProps) => {
  const [localStream, setLocalStream] = useState<MediaStream>();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      setLocalStream(stream);
    });
  }, []);

  return (
    <StudyLayout page="studyroom">
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
