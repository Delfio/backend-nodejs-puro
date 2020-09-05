class CreateError {
    constructor({message, statusCode = 400}) {
        this.message = {
            "error": message
        };
        this.statusCode = statusCode;
    }
}
module.exports = CreateError;