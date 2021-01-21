/**
 *
 * @param {Array.<String>} actionTypes
 */
export const multipleActionTypeMatcher = (actionTypes) => (action) =>
  actionTypes.some((actionType) => actionType.type === action.type);
