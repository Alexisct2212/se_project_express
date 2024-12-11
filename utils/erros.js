const BAD_REQUEST_STATUS_CODE = {status:400,message:"input field required"};
const REQUEST_NOT_FOUND = {status:404,message:"item not found"};
const DEFAULT_ERROR = {status:500,message:"An error has occurred on the server."};
const AUTHORIZATION_ERROR = {status:401,message:"Unauthorized access"};
const CONFLICT_ERROR = {status:403,message:"You are not authorized to delete this "};
const DUPLICATE_ERROR = {status:409,message:"This email is already exists"}
module.exports = { BAD_REQUEST_STATUS_CODE, REQUEST_NOT_FOUND, DEFAULT_ERROR,AUTHORIZATION_ERROR,CONFLICT_ERROR,DUPLICATE_ERROR };