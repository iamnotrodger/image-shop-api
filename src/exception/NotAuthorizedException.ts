import HttpException from './HttpException';

export default class NotAuthorizedException extends HttpException {
    constructor(message: string = 'Unauthorized') {
        super(403, message);
    }
}
