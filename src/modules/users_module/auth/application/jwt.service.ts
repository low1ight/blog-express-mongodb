import jwt from "jsonwebtoken";
import {UserPayloadModel} from "../models/user-payload-model";
import {JwtPayloadModel} from "../models/jwt-payload-model";

export const jwtService = {

       sign(userId:string) {
           return jwt.sign(
               { id: userId },
               '1111',
               { expiresIn: "1h" }
           );
       },



    verify(token:string):UserPayloadModel | null {
           let payload
           try {
               payload = jwt.verify(token, '1111') as JwtPayloadModel;
               return {id: payload.id};

           }
           catch(err) {
               return null
           }


    }

}