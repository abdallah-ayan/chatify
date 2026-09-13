export default class {
    constructor(res) {
        this.res = res;
        this.msg = {};

        return new Proxy(this, {
            get: (target, prop, receiver) => {
                if (!(prop in target)) {
                    return (param) => {
                        target.feild(prop, param);
                        return receiver; // نرجع الـ Proxy
                    };
                }

                return target[prop];
            }
        });
    }

    token(val) {
        const option = {
            maxAge : +process.env.TOKEN_EXPAIRE ,
            secure : true ,
            httpOnly : process.env.NODE_ENV == "development" ? false : true ,
            sameSite : "strict"
        }
        this.res.cookie("token" , val , option)
        return this
    }
    status(status) {
        this.res.status(status);
        return this;
    }

    feild(name, param) {
        this.msg = {
            ...this.msg,
            [name]: param
        };

        return this;
    }

    end() {
        this.res.json(this.msg);
        return this.res;
    }
};