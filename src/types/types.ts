export enum USER_ROLES {
    ADMIN = "ADMIN",
    NORMAL = "NORMAL"
}

export type AuthenticationData = {
    id: string,
    role: USER_ROLES
}

export interface Feed {
    id: string,
    title: string,
    description: string,
    creation_date: string,
    user_id: string,
    name: string,
}