const BAD_REQUEST_STATUS_CODE = {status:400,message:"input field required"};
const AUTHORIZATION_ERROR = {status:401,message:"Unauthorized access"};
const CONFLICT_ERROR = {status:403,message:"Forbidden "};
const REQUEST_NOT_FOUND = {status:404,message:"route not found"};
const DUPLICATE_ERROR = {status:409,message:"Conflict"}
const DEFAULT_ERROR = {status:500,message:"An error has occurred on the server."};
module.exports = { BAD_REQUEST_STATUS_CODE, REQUEST_NOT_FOUND, DEFAULT_ERROR,AUTHORIZATION_ERROR,CONFLICT_ERROR,DUPLICATE_ERROR };