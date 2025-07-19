import jwt from "jsonwebtoken";

export const sendCookies = (user, res,message, statusCode =201)=>{
      const token = jwt.sign({_id:user._id},
            process.env.JWT_SECRET
        )
    
     
        res
        .status(statusCode).cookie("token", token, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
          secure: true,
          sameSite: "strict",
        }).json({
          success: true,
          message,
          user,
        });
}

