import {

    devicesCollection, likeForCommentCollection, likeForPostCollection
} from "../../../db/mongodb";
import {Blog} from "../../../db/models/blog.model";
import {Post} from "../../../db/models/post.model";
import {Comment} from "../../../db/models/comment.model";
import {User} from "../../../db/models/user.model";


export const testingRepository = {


    async deleteAllData() {
        await Blog.deleteMany();
        await Post.deleteMany();
        await User.deleteMany();
        await Comment.deleteMany();
        await devicesCollection.deleteMany({});
        await likeForCommentCollection.deleteMany({});
        await likeForPostCollection.deleteMany({});

    },


    async getUserEmailConfirmationCodeByEmail(email: string): Promise<string> {
        const user = await User.findOne({email});
        return user?.confirmationData?.confirmationCode || ""


    },

    async getUserPasswordRecoveryCodeByEmail(email: string): Promise<string> {
        const user = await User.findOne({email});
        return user?.passwordRecovery?.code || ""


    }


}