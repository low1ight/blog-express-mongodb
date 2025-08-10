import bcrypt from 'bcrypt'

export const passwordHelper = {

    async hashPassword(password:string):Promise<string> {

        const salt = await bcrypt.genSalt(10)

        return  await bcrypt.hash(password, salt)

    }



}