
import {Blog} from "../../../db/models/blog.model";
import {Post} from "../../../db/models/post.model";
import {Comment} from "../../../db/models/comment.model";
import {User} from "../../../db/models/user.model";
import {LikeForComment} from "../../../db/models/likeForComment.model";
import {Device} from "../../../db/models/device.model";
import {LikeForPost} from "../../../db/models/likeForPost.model";


export const testingRepository = {


    async deleteAllData() {
        await Blog.deleteMany();
        await Post.deleteMany();
        await User.deleteMany();
        await Comment.deleteMany();
        await Device.deleteMany();
        await LikeForComment.deleteMany();
        await LikeForPost.deleteMany();

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