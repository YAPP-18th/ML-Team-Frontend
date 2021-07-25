// var previousUserAction = 'study';
var currentUserAction = 'study';
// var startTime = Date.now();
// var userActions = {
//   userAction: {
//     study: { time: 0, count: 0 },
//     drowsiness: { time: 0, count: 0 },
//     smartPhone: { time: 0, count: 0 },
//     leave: { time: 0, count: 0 },
//   },
// };
var drowsinessCount = 0;
var studyCount = 0;
var leaveCount = 0;

var isHandExist = true;
var isUsingSmartPhone = false;

var LeftTargetLandmark = [];
var RightTargetLandmark = [];

async function smartPhoneDetection(network, image) {
  const detections = await network.detect(image);

  isUsingSmartPhone = false;
  detections.forEach((prediction) => {
    const text = prediction['class'];

    if (text === 'cell phone' && isHandExist) {
      studyCount = 0;
      drowsinessCount = 0;
      leaveCount = 0;
      isUsingSmartPhone = true;
      currentUserAction = 'phone';
      // console.log('smartPhoneDetection 스마트폰중!' + new Date().getTime());
      // if (previousUserAction !== currentUserAction) {
      // userActionTimer(startTime, currentUserAction);
      // userActions['userAction'][currentUserAction]['count'] += 1;
      //   previousUserAction = currentUserAction;
      // }
    }
  });

  return currentUserAction;
}

function handDetection(results) {
  if (results.multiHandedness !== undefined) {
    isHandExist = true;
    if (!isUsingSmartPhone) {
      drowsinessDetection(results);
    }
  } else {
    leaveCount += 1;
    if (leaveCount >= 20) {
      currentUserAction = 'await';
      // console.log('handDetection 자리비움!' + new Date().getTime());
      isHandExist = false;
      leaveCount = 0;
    }
    // if (previousUserAction !== currentUserAction) {
    // userActionTimer(startTime, currentUserAction);
    // userActions['userAction'][currentUserAction]['count'] += 1;
    // previousUserAction = currentUserAction;
    // }
  }

  return currentUserAction;
}

const DROWSINESS_CONSTANT_1 = 3;
const DROWSINESS_CONSTANT_2 = 0.005;

function drowsinessDetection(handInfo) {
  var leftFingerDetection = true;
  var rightFingerDetection = true;
  var bothFingerDetection = true;
  var isRightFingerXMove;
  var isRightFingerYMove;
  var isLeftFingerXMove;
  var isLeftFingerYMove;

  if (handInfo.multiHandLandmarks.length === 2) {
    if (RightTargetLandmark !== []) {
      if (RightTargetLandmark[4] !== undefined) {
        isRightFingerXMove =
          Math.abs(
            (
              handInfo.multiHandLandmarks[0][4]['x'] -
              RightTargetLandmark[4]['x']
            ).toFixed(DROWSINESS_CONSTANT_1),
          ) > DROWSINESS_CONSTANT_2;
        isRightFingerYMove =
          Math.abs(
            (
              handInfo.multiHandLandmarks[0][4]['y'] -
              RightTargetLandmark[4]['y']
            ).toFixed(DROWSINESS_CONSTANT_1),
          ) > DROWSINESS_CONSTANT_2;
        rightFingerDetection = isRightFingerXMove && isRightFingerYMove;
      }
    }
    if (LeftTargetLandmark !== []) {
      if (LeftTargetLandmark[4] !== undefined) {
        isLeftFingerXMove =
          Math.abs(
            (
              handInfo.multiHandLandmarks[1][4]['x'] -
              LeftTargetLandmark[4]['x']
            ).toFixed(DROWSINESS_CONSTANT_1),
          ) > DROWSINESS_CONSTANT_2;
        isLeftFingerYMove =
          Math.abs(
            (
              handInfo.multiHandLandmarks[1][4]['y'] -
              LeftTargetLandmark[4]['y']
            ).toFixed(DROWSINESS_CONSTANT_1),
          ) > DROWSINESS_CONSTANT_2;
        leftFingerDetection = isLeftFingerXMove && isLeftFingerYMove;
      }
    }

    bothFingerDetection = rightFingerDetection || leftFingerDetection;
    if (bothFingerDetection) {
      studyCount += 1;
      if (currentUserAction !== 'study' && studyCount >= 120) {
        currentUserAction = 'study';
        // console.log('drowsinessDetection 공부중!' + new Date().getTime());
        studyCount = 0;
        drowsinessCount = 0;
        leaveCount = 0;
      } else {
        currentUserAction = 'study';
        // console.log('drowsinessDetection 공부중!' + new Date().getTime());
        drowsinessCount = 0;
        leaveCount = 0;
      }
      // if (previousUserAction !== currentUserAction) {
      // userActionTimer(startTime, currentUserAction);
      // userActions['userAction'][currentUserAction]['count'] += 1;
      // previousUserAction = currentUserAction;
      // }
    } else {
      drowsinessCount += 1;
      if (drowsinessCount >= 50) {
        currentUserAction = 'sleep';
        // console.log('drowsinessDetection 졸고있음!' + new Date().getTime());
      }
      // if (previousUserAction !== currentUserAction) {
      // userActionTimer(startTime, currentUserAction);
      // userActions['userAction'][currentUserAction]['count'] += 1;
      // previousUserAction = currentUserAction;
      // }
    }

    RightTargetLandmark = handInfo.multiHandLandmarks[0];
    LeftTargetLandmark = handInfo.multiHandLandmarks[1];
  } else {
    if (handInfo.multiHandedness[0]['label'] === 'Left') {
      if (LeftTargetLandmark !== []) {
        if (LeftTargetLandmark[4] !== undefined) {
          isLeftFingerXMove =
            Math.abs(
              (
                handInfo.multiHandLandmarks[0][4]['x'] -
                LeftTargetLandmark[4]['x']
              ).toFixed(DROWSINESS_CONSTANT_1),
            ) > DROWSINESS_CONSTANT_2;
          isLeftFingerYMove =
            Math.abs(
              (
                handInfo.multiHandLandmarks[0][4]['y'] -
                LeftTargetLandmark[4]['y']
              ).toFixed(DROWSINESS_CONSTANT_1),
            ) > DROWSINESS_CONSTANT_2;
          leftFingerDetection = isLeftFingerXMove || isLeftFingerYMove;
        }
      }

      if (!leftFingerDetection) {
        drowsinessCount += 1;
        if (drowsinessCount >= 50) {
          currentUserAction = 'sleep';
          // console.log('drowsinessDetection 졸고있음!' + new Date().getTime());
        }
        // if (previousUserAction !== currentUserAction) {
        // userActionTimer(startTime, currentUserAction);
        // userActions['userAction'][currentUserAction]['count'] += 1;
        // previousUserAction = currentUserAction;
        // }
      }
      LeftTargetLandmark = handInfo.multiHandLandmarks[0];
    } else {
      if (RightTargetLandmark !== []) {
        if (RightTargetLandmark[4] !== undefined) {
          isRightFingerXMove =
            Math.abs(
              (
                handInfo.multiHandLandmarks[0][4]['x'] -
                RightTargetLandmark[4]['x']
              ).toFixed(DROWSINESS_CONSTANT_1),
            ) > DROWSINESS_CONSTANT_2;
          isRightFingerYMove =
            Math.abs(
              (
                handInfo.multiHandLandmarks[0][4]['y'] -
                RightTargetLandmark[4]['y']
              ).toFixed(DROWSINESS_CONSTANT_1),
            ) > DROWSINESS_CONSTANT_2;
          rightFingerDetection = isRightFingerXMove || isRightFingerYMove;
        }
      }

      if (!rightFingerDetection) {
        drowsinessCount += 1;
        if (drowsinessCount >= 50) {
          currentUserAction = 'sleep';
          // console.log('drowsinessDetection 졸고있음!' + new Date().getTime());
        }
        // if (previousUserAction !== currentUserAction) {
        // userActionTimer(startTime, currentUserAction);
        // userActions['userAction'][currentUserAction]['count'] += 1;
        // previousUserAction = currentUserAction;
        // }
      }

      RightTargetLandmark = handInfo.multiHandLandmarks[0];
    }
  }
}

// function userActionTimer(startTime, currentUserAction) {
//   const endTime = Date.now();
//   const Time = endTime - startTime;
//   userActions['userAction'][currentUserAction]['time'] += Math.round(
//     Time / 1000,
//   );
//   startTime = Date.now();
// }

export { smartPhoneDetection, handDetection };
