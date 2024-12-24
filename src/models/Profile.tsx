export interface IProfile {
    firstName?: string,
    lastName?: string,
    email?: string
    uid?: string,
    externalDonorId?: string,
    donorId?: string,
    fullName?: string,
    accessToken?: string,
    refreshToken?: string,
    createdDate?: string,
    expiry?: string
}
export interface ILoginForm {
    email: string,
    password: string
}