class CustomError extends Error {
	constructor({ message = "Internal Server Error", reason = "INTERNAL_SERVER_ERROR", statusCode = 500 }) {
		super(message);
		this.error = true;
		this.statusCode = statusCode;
		this.reason = reason;
		this.message = message;
	}
}

const ERROR = {
	BAD_REQUEST: ({ message = "Bad Request", reason = "BAD_REQUEST", statusCode = 400 } = {}) => {
		throw new CustomError({ message, reason, statusCode });
	},

	METHOD_NOT_ALLOWED: ({ message = "Method Not Allowed", reason = "METHOD_NOT_ALLOWED", statusCode = 405 } = {}) => {
		throw new CustomError({ message, reason, statusCode });
	},

	FORBIDDEN: ({ message = "Forbidden", reason = "FORBIDDEN", statusCode = 403 } = {}) => {
		throw new CustomError({ message, reason, statusCode });
	},

	UNAUTHORIZED: ({ message = "Unauthorized", reason = "UNAUTHORIZED", statusCode = 401 } = {}) => {
		throw new CustomError({ message, reason, statusCode });
	},

	INTERNAL_SERVER_ERROR: ({ message = "Internal Server Error", reason = "INTERNAL_SERVER_ERROR", statusCode = 500 } = {}) => {
		throw new CustomError({ message, reason, statusCode });
	},

	NOT_FOUND: ({ message = "Not Found", reason = "NOT_FOUND", statusCode = 404 } = {}) => {
		throw new CustomError({ message, reason, statusCode });
	},

	UNPROCESSABLE_ENTITY: ({ message = "Unprocessable Entity", reason = "Unprocessable Entity", statusCode = 422 } = {}) => {
		throw new CustomError({ message, reason, statusCode });
	},

	CONFLICT: ({ message = "Data already exists", reason = "Data already exists", statusCode = 409 } = {}) => {
		throw new CustomError({ message, reason, statusCode });
	},
};

const ERRORS_LIST = Object.keys(ERROR);

module.exports = { ...ERROR, ERRORS_LIST };
