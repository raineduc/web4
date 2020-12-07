/**
 * 
 * @param {Array.<String>} actionTypes 
 */
export const multipleActionTypeMatcher = (actionTypes) => action => {
  return actionTypes.includes(action.type);
};