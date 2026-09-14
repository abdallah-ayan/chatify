export default class customError extends Error{
    constructor(msg , status) {
        super(msg);
        this.status = status;
        this.isOpertionalError = true;
    }
}