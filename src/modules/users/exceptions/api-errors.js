module.exports = class ApiError extends Error {
  status;
  errors;
  name;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
    this.name = message;
  }

  static UnauthorizedError() {
    return new ApiError(401, "Пользователь не авторизован")
  }

  static BadRequest(message, errors = []) {
    return new ApiError(410, message, errors)
  }
}

