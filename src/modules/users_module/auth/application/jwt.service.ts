import jwt from "jsonwebtoken";

export const jwtService = {

       sign(userId:string) {
           return jwt.sign(
               { userId },
               '1111',
               { expiresIn: "1h" }
           );
       }

}