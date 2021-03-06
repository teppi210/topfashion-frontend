/**
 * Removes all own properties from object.
 * @param obj - object to cleaning
 * @returns {object} obj
 */
export default (obj: any = {}) => {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      // eslint-disable-line no-prototype-builtins
      delete obj[prop];
    }
  }
  return obj;
};
