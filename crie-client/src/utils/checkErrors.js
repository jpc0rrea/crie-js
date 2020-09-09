const checkErrors = (errorsObject) => {
  for (var key in errorsObject) {
    if (errorsObject[key]) {
      return false;
    }
  }
  return true;
};

export default checkErrors;
