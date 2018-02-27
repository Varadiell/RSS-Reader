// Create a new error object
exports.newError = function(errStatus, errMessage){
  let errMsg = errMessage;
  if(!errMsg) errMsg = 'Error (Missing message).';
  const err = new Error(errMsg);
  err.status = errStatus;
  return err;
};
