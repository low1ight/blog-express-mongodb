export type UserInsertModel = {
    login:string,
    password:string,
    email:string,
    createdAt:string,
    confirmationData:{
        isConfirmed: boolean,
        confirmationCode:string
        confirmationCodeExpirationDate:string
    }
}