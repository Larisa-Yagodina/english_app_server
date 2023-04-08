module.exports = class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
    this.message = message;
  }

  static UnauthorizedError() {
    return new ApiError(401, "Пользователь не авторизован")
  }

  static BadRequest(message, errors = []) {
    console.log(message);
    return new ApiError(410, message, errors)
  }
}

