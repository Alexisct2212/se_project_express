const BAD_REQUEST_STATUS_CODE = {status:400,message:"input field required"};
const REQUEST_NOT_FOUND = {status:404,message:"item not found"};
const DEFAULT_ERROR = {status:500,message:"An error has occurred on the server."};

module.exports = { BAD_REQUEST_STATUS_CODE, REQUEST_NOT_FOUND, DEFAULT_ERROR };