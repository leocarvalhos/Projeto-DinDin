import { SetStateAction } from 'react'

export default interface IUser {
    user: {
        id?: number
        name?: string
        email?: string
        token?:string
        
    } | null | undefined
    setUser: SetStateAction<{} | undefined>
    remove(): void
}