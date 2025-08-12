import bcrypt from 'bcrypt'

export const passwordHelper = {

    async hashPassword(password:string):Promise<string> {

        const salt = await bcrypt.genSalt(10)

        return  await bcrypt.hash(password, salt)

    },

    async comparePassword(inputPassword:string,correctPassword:string):Promise<boolean> {
        return  await bcrypt.compare(inputPassword, correctPassword)

    }



}