import React, { useEffect, useMemo, useState } from 'react';
import { StudyRoom } from '@pages/AppMain/Study/StudyRoom';
import { StudyReady } from '@pages/AppMain/Study/StudyReady';
import { StudyFinish } from '@pages/AppMain/Study/StudyFinish';

export enum StudyStep {
  NOTHING = 'NOTHING',
  STUDY_READY = 'STUDY_READY',
  STUDY_ROOM = 'STUDY_ROOM',
  STUDY_FINISH = 'STUDY_FINISH',
}

interface IStudyProps {
  isPublic: boolean;
}

export interface ICurrentStudy {
  studyId: number;
  title: string;
  description: string;
}

export interface ITotalStudyData {
  sets: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Study = ({ isPublic }: IStudyProps) => {
  const [currentStudy, setCurrentStudy] = useState<ICurrentStudy>();
  const [step, setStep] = useState<StudyStep>(StudyStep.NOTHING);
  const [totalData, setTotalData] = useState<number[]>([]);
  const componentRendered = useMemo(() => {
    switch (step) {
      case StudyStep.STUDY_READY:
        return (
          <StudyReady
            isPublic={isPublic}
            setStep={setStep}
            currentStudy={currentStudy}
          />
        );
      case StudyStep.STUDY_ROOM:
        return (
          <StudyRoom
            isPublic={isPublic}
            setStep={setStep}
            setTotalData={setTotalData}
            currentStudy={currentStudy}
          />
        );
      case StudyStep.STUDY_FINISH:
        return (
          <StudyFinish totalData={totalData} currentStudy={currentStudy} />
        );
    }
  }, [step]);

  // 페이지에 처음 들어왔을 때만 실행
  useEffect(() => {
    // 서버에서 이 사람이 어떤 step에 있는지 알아본다.
    const currentStepFromServer = step;
    switch (currentStepFromServer) {
      case StudyStep.NOTHING:
        // 공부방 입장 API
        setStep(StudyStep.STUDY_READY);
        break;
      case StudyStep.STUDY_READY:
        // 현재 접속 중인 공부방의 정보를 받아와서 setCurrentStudy
        setStep(StudyStep.STUDY_READY);
        break;
      case StudyStep.STUDY_ROOM:
        // 현재 접속 중인 공부방의 정보를 받아와서 setCurrentStudy
        setStep(StudyStep.STUDY_ROOM);
        break;
      case StudyStep.STUDY_FINISH:
        // 현재 접속 중인 공부방의 정보를 받아와서 setCurrentStudy
        setStep(StudyStep.STUDY_FINISH);
        break;
    }
  }, []);

  return <>{componentRendered}</>;
};
