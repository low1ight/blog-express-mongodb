import {
    commentCollection,
    devicesCollection, likeForCommentCollection, likeForPostCollection,
    userCollection
} from "../../../db/mongodb";
import {Blog} from "../../../db/models/blog.model";
import {Post} from "../../../db/models/post.model";


export const testingRepository = {


    async deleteAllData() {
        await Blog.deleteMany();
        await Post.deleteMany();
        await userCollection.deleteMany({});
        await commentCollection.deleteMany({});
        await devicesCollection.deleteMany({});
        await likeForCommentCollection.deleteMany({});
        await likeForPostCollection.deleteMany({});

    },


    async getUserEmailConfirmationCodeByEmail(email: string): Promise<string> {
        const user = await userCollection.findOne({email});
        return user?.confirmationData?.confirmationCode || ""


    },

    async getUserPasswordRecoveryCodeByEmail(email: string): Promise<string> {
        const user = await userCollection.findOne({email});
        return user?.passwordRecovery?.code || ""


    }


}