import {CustomResponseEnum} from "./customResponseEnum";

export class CustomResponse<T> {
    constructor(
        public readonly isSuccessful: boolean,
        public readonly errStatusCode: CustomResponseEnum | null = null,
        public readonly content: T | null

    ) {}

}