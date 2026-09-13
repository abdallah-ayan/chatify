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

    /**
     * Sets the authentication token cookie for the response.
     *
     * @param {string} val Cookie value to send.
     * @param {number} [age] Cookie lifetime in milliseconds; defaults to
     * the configured token expiration.
     * @returns {this} This response builder for further chaining.
     */
    token(val , age = +process.env.TOKEN_EXPAIRE) {
        const option = {
            maxAge : age ,
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