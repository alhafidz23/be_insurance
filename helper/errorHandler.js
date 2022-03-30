class ApplicationError extends Error {
    constructor(message, status) {
        super();

        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;

        this.message = message || 'Internal Server Error.';

        this.status = status || 500;
    }
}


class ValidationError extends ApplicationError {
    constructor(message, status) {
        super(message || 'Validation Error.', status || 102);
    }
}


class DatabaseError extends ApplicationError {
    constructor(message, status) {
        super(message || 'Database Error.', status || 200);
    }
}


class AuthorizationError extends ApplicationError {
    constructor(message, status) {
        super(message || 'Unauthorized.', status || 107);
    }
}


module.exports = {
    ApplicationError,
    AuthorizationError,
    ValidationError,
    DatabaseError
};