import { USER_ROLES } from "../types/types";

export class User {
    constructor(
        protected id: string,
        protected name: string,
        protected email: string,
        protected password: string,
        protected role: USER_ROLES,

    ) { }

    public getId(): string {
        return this.id
    }

    public getName(): string {
        return this.name
    }

    public getEmail(): string {
        return this.email
    }

    public getPassword(): string {
        return this.password
    }

    public getRole(): USER_ROLES {
        return this.role
    }

    static toUserModel(data: User) {
        return new User(data.id, data.name, data.email, data.password, data.role)
    }
}