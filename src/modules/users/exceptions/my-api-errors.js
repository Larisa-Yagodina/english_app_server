function MyApiError(message) {
  this.name = 'MyError';
  this.message = message || 'Сообщение по умолчанию';
  this.stack = (new Error()).stack;
}

MyApiError.prototype = Object.create(Error.prototype);
MyApiError.prototype.constructor = MyApiError;

try {
  throw new MyApiError();
} catch (e) {
  console.log(e.name);     // 'MyError'
  console.log(e.message);  // 'Сообщение по умолчанию'
}

try {
  throw new MyApiError('пользовательское сообщение');
} catch (e) {
  console.log(e.name);     // 'MyError'
  console.log(e.message);  // 'пользовательское сообщение'
}