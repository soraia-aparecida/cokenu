import { v4 } from "uuid"

export const GenerateId = (): string => {
    return v4()
}