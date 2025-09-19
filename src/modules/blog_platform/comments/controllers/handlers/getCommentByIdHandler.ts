import {Request, Response} from "express";
import {commentQueryRepository} from "../../repositories/commentQuery.repository";


export const getCommentByIdHandler = async (req: Request, res: Response) => {

    const comment = await commentQueryRepository.getCommentById(req.params.id);

    if(!comment){
        res.sendStatus(404)
        return
    }

     res.status(200).send(comment);


}