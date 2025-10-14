import {UserViewModel} from "../../../../src/modules/users_module/users/models/user-view-model";
import {UserInputModel} from "../../../../src/modules/users_module/users/models/user-input-model";

const usersBase = [
    { login: 'alexander', email: 'alexander.smith@gmail.com' },
    { login: 'emily', email: 'emily.johnson@yahoo.com' },
    { login: 'michael', email: 'michael.brown@hotmail.com' },
    { login: 'sophia', email: 'sophia.davis@gmail.com' },
    { login: 'daniel', email: 'daniel.miller@gmail.com' },
    { login: 'olivia', email: 'olivia.wilson@mail.ru' },
    { login: 'william', email: 'william.moore@outlook.com' },
    { login: 'ava', email: 'ava.taylor@gmail.com' },
    { login: 'james', email: 'james.anderson@icloud.com' },
    { login: 'isabella', email: 'isabella.thomas@gmail.com' },
    { login: 'benjamin', email: 'benjamin.jackson@gmail.com' },
    { login: 'mia', email: 'mia.white@yahoo.com' },
    { login: 'lucas', email: 'lucas.harris@gmail.com' },
    { login: 'charlotte', email: 'charlotte.martin@gmail.com' },
    { login: 'henry', email: 'henry.thompson@outlook.com' },
];

export const correctUserInputData: UserInputModel[] = usersBase.map((u, i) => ({
    login: u.login,
    email: u.email,
    password: `password${i + 1}`,
}));

export const correctCreatedUsersViewModels: UserViewModel[] = usersBase.map((u) => ({
    id: expect.any(String),
    login: u.login,
    email: u.email,
    createdAt: expect.any(String),
}));


