import {Request} from "express";


export type RequestWithBody<T> = Request<{},{}, T>
export type RequestWithParam<T> = Request<T>
export type RequestWithParamAndBody<T,B> = Request<T,{}, B>


export type Id = {id:string}