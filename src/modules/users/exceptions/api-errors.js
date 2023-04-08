module.exports = class ApiError extends Error {
  status;
  errors;
  clientMessage;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
    this.clientMessage = message;
  }

  static UnauthorizedError() {
    return new ApiError(401, "Пользователь не авторизован")
  }

  static BadRequest(message, errors = []) {
    return new ApiError(410, message, errors)
  }
}

