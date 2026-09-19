import Res from "../utils/Res.js";
import "dotenv/config"

const duplicateErrorHandler = (err) =>  {
    const ob = err.keyValue
    const key = Object.keys(ob)[0];
    const value = ob[key];
    err.message = `The value "${value}" for "${key}" already exists. Please use a different value.`;
    err.status = 400;
}

function devError(error , res) {
    Res(res).status(error.status).stack(error.stack).message(error.message).error(error).end();
}

function ValidatorErrorHanlder(err) {
    err.status = 400
    err.message = err.message
}

function systemErrorHandler(err) {
    err.status = 500
    err.message = "Intervel Server Error"
}

function JsonWebTokenErrorHandler(err) {
    err.status = 401;
    err.message = "The token you provided is invalid.";
}

function TokenExpiredErrorHandler(err) {
    err.status = 401;
    err.message = "The token you provided has expired.";
}

function CastErrorHandler(err) {
    err.message = "The ID you entered is invalid"
    err.status = 400
}

function prodError(error , res) {
    const err = Object.create(Object.getPrototypeOf(error),Object.getOwnPropertyDescriptors(error));
    if(error.isOpertionalError) return Res(res).status(error.status).state("error").message(error.message).end();


    if(error.code == "11000") duplicateErrorHandler(err)
    else if (error.name === "ValidationError" &&Object.values(error.errors).some(err => err.name === "CastError")) CastErrorHandler(err);
    else if (Object.values(error.errors ?? {}).some(err => err.name === "ValidatorError")) ValidatorErrorHanlder(err);
    else if(error.name == "JsonWebTokenError") JsonWebTokenErrorHandler(err)
    else if(error.name == "TokenExpiredError") TokenExpiredErrorHandler(err)
    else systemErrorHandler(err)
    
    Res(res).status(err.status).state("error").message(err.message ).end();


}

export default function (error , req , res , next) {
    if (res.headersSent) return ;
    if(process.env.NODE_ENV == "development") {
        devError(error , res) ;
    } else if(process.env.NODE_ENV == "production") {
        prodError(error , res);
    }
}

