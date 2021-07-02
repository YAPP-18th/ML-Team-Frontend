var isTwoHands = false;

function userHandDetection(results) {
  if (results.multiHandedness !== undefined) {
    if (results.multiHandedness.length === 2) {
      console.log('Two hands');
      isTwoHands = true;
    } else {
      console.log('hand');
      isTwoHands = false;
    }
  } else {
    isTwoHands = false;
  }
  return isTwoHands;
}

export { userHandDetection };
