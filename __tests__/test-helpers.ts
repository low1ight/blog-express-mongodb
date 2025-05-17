import {agent} from "supertest";
import {app} from "../src/app";
import {SETTINGS} from "../src/settings";

export const req = agent(app)



export const correctBasicAuthData =
    "Basic " + Buffer.from(`${SETTINGS.AUTH.BASIC_AUTH_LOGIN}:${SETTINGS.AUTH.BASIC_AUTH_PASSWORD}`).toString("base64");

export const reqWithAuth = agent(app).set('Authorization', correctBasicAuthData)



export const generateRandomStr = (length:number) => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
}






