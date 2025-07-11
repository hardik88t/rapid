export const errorMessage = (statusCode, message) => {
  const error = new Error();
  console.log(`${statusCode} ${message}`.red.bold.italic)
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
