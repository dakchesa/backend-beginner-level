// import { User } from '../models/user.model.js';

// const registerUser = async (req,res) =>{
//     try{
//         const {username, email, password} = req.body;
//         //basic validation i.e if user doesnt enter any field he wont be registered

//         if (!username || !email || !password){
//             return res.status(400).json({message:"All fileds are important!"})
//         }

//         //checks if user exists alreadyi.e cant be registered again
//         const existing = await User.findOne({email:email.toLowerCase()});
//         if(existing){
//             return res.status(400).json({message:"User already exists!"});
//         }
//         //finally create the user
//         const User = await User.create({
//             username,
//             email: email.toLowerCase(),
//             password,
//         });
//         res.status(201).json({message: "User Registered !",
//             user: { id: User._id,email: User.email, username: User.username }
//         }); 
//     }catch (error){
//         res.status(500).json({message:"Internal server error", error:error.message});
//     }
// }
// export{
//     registerUser
// };

import { User } from '../models/user.model.js';

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // basic validation: reject the request if any field is missing
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const normalizedEmail = email.toLowerCase();

        // check whether a user with this email already exists
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        // create the user
        const newUser = await User.create({
            username,
            email: normalizedEmail,
            password, // needs to be hashed
        });

        res.status(201).json({
            message: "User Registered!",
            user: { id: newUser._id, email: newUser.email, username: newUser.username },
        });
    } catch (error) {
        // duplicate key from a unique index (e.g. a race between two requests)
        if (error.code === 11000) {
            return res.status(400).json({ message: "User already exists!" });
        }
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const loginUser = async (req,res) => {
    try {
        //checking if user already exists
        const { email, password } = req.body;
        const user = await User.findOne({
            email: email.toLowerCase()
        });
        if(!user) return res.status(400).json({
            message: "User not found"
        });

        //comparing passwords
        const isMatch = await User.comparePassword(password);
        if(!isMatch) return res.status(400).json({
            message: "invalid input"
        });
        //if passwords match
        res.status(200).json({
            message: "User Logged in",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });
    }catch(error){
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}


export { 
    registerUser,
    loginUser 

};