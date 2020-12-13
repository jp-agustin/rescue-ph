const isEmpty = (value) => value === undefined
  || value === null
  || (typeof value === 'object' && Object.keys(value).length === 0)
  || (typeof value === 'string' && value.trim().length === 0);

const isValidRescue = ({
  contactNumber, contactPerson, location, noOfPerson,
}) => {
  if (
    isEmpty(contactPerson)
    || isEmpty(contactNumber)
    || isEmpty(location)
    || isEmpty(noOfPerson)
    || (isEmpty(location.address) && (isEmpty(location.lat) || isEmpty(location.lon)))
  ) {
    return false;
  }
  return true;
};

module.exports = {
  isEmpty,
  isValidRescue,
};
