class AppwriteError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'AppwriteError';
    this.code = code || 500;
  }
}

module.exports = AppwriteError;