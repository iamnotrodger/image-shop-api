import HttpException from './HttpException';

export default class InvalidRequestException extends HttpException {
    constructor(message: string = 'Invalid Request') {
        super(422, message);
    }
}
