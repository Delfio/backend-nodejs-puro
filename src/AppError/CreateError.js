class CreateError {
    constructor({message, statusCode = 400}) {
        this.messa = message;
        this.statusCode = statusCode;
    }
}
module.exports = CreateError;