class APIError extends Error {
    constructor({ message, errors, statusCode, isPublic, stack }) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.errors = errors;
        this.statusCode = statusCode;
        this.isPublic = isPublic;
        this.stack = stack;
    }
}

module.exports = APIError;
