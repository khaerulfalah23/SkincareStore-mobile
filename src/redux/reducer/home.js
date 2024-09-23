// const initHome = {
//   food: [],
//   newTaste: [],
//   popular: [],
//   recommended: [],
// };

const initHome = {
  skincare: [],
  sunscreen: [],
  serum: [],
  facialWash: [],
};

export const homeReducer = (state = initHome, action) => {
  if (action.type === 'SET_SKINCARE') {
    return {
      ...state,
      skincare: action.value,
    };
  }
  if (action.type === 'SET_SUNSCREEN') {
    return {
      ...state,
      sunscreen: action.value,
    };
  }
  if (action.type === 'SET_SERUM') {
    return {
      ...state,
      serum: action.value,
    };
  }
  if (action.type === 'SET_FACIAL_WASH') {
    return {
      ...state,
      facialWash: action.value,
    };
  }
  return state;
};
