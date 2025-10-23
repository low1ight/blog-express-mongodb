export type UserInsertModel = {
    login:string,
    password:string,
    email:string,
    confirmationData:{
        isConfirmed: boolean,
        confirmationCode:string
        confirmationCodeExpirationDate:string
    }
    passwordRecovery: {
        code:string | null
        expirationDate:string | null
    }
}