export class ApiError {
  constructor(path, message) {
    this.path = path;
    this.message = message;
  }
}
export const errorHandler = (err, _req, res, _next) => {
  console.log(err?.path, err?.message);
  return res.json({
    status: false,
    message: err?.message,
    data: null,
  });
};
