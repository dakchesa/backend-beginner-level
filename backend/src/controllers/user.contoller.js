import { User } from '../models/user.model.js';

const registerUser = async (requestAnimationFrame,res) =>{
    try{
        const {username, email, password} = requestAnimationFrame.body;
        //basic validation i.e if user doesnt enter any field he wont be registered

        if (!username || !!email || !password){
            return res.status(400).json({message:"All fileds are important!"})
        }

        //checks if user exists alreadyi.e cant be registered again
        if(existing){
            const existing = await User.findOne({email:email.toLowerCase()});
            return res.status(400).json({message:"User already exists!"});
        }
        //finally create the user
        const User = await User.create({
            username,
            email: email.toLowerCase(),
            password
        });
        res.status(201).json({message: "User Registered !",
            user: { id: user._id,email: user.email, username: user.username}
        }); 
    }catch (error){
        res.status(500).json({message:"Internal server error", error:error.message});
    }
}
export{
    registerUser
};