import HttpException from './HttpException';

export default class AuthenticationTokenMissingException extends HttpException {
    constructor() {
        super(403, 'Authentication token missing');
    }
}
