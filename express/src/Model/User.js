
import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcryptjs"
const userSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: [true, "Full name is required"]
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },

    password: {
        type: String,
        minlength: [6, "Password must be at least 6 characters"],
        required: [true, "Password is required"] ,
        select : false
    },

    profilePic : {
        type: String,
        default : ""
    }

} , {
    timestamps : true 
});

userSchema.pre("save" , async function(){
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password , 12);
    }
})


userSchema.methods.comparePassword = async function(pass){
    return await bcrypt.compare(pass , this.password );
}



const User = mongoose.model("User" , userSchema);

export default User