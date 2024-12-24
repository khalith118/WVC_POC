import React, { createContext, useContext, useState } from 'react'
import { IProfile } from '../models/Profile';

interface IUserContext {
    profile: IProfile | null,
    setProfile: (profile: IProfile | null) => void;
}
interface IUserProvider {
    children: React.ReactNode
}
const UserContext = createContext<IUserContext | undefined>(undefined);

const UserProvider = ({ children }: IUserProvider) => {
    const [profile, setProfile] = useState<IProfile | null>(null);

    return (
        <UserContext.Provider value={{ profile, setProfile }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider

export const useUserProfile = (): IUserContext => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserProfile must be used within a UserProvider');
    }
    return context;
}

