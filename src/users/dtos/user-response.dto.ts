import { Exclude, Expose } from "class-transformer"


export class UserResponseDto {
    id: string
    name: string
    email: string
    @Exclude()
    password: string

    @Exclude()
    country: string

    @Expose({ name: 'Country' })
    getCountry(): string {
        return this.country
    }

    constructor(response: Partial<UserResponseDto>) {
        Object.assign(this, response)
    }
}