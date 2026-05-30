import {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";

import type { ReactNode } from "react";

interface AuthContexType{
    user: string | null;
    isAuthenticated: boolean;
    login: (email: string) => void;
    logout: () => void;
}

const AuthContext = createContext({}as AuthContexType);

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}){
    const [user, setUser] = useState<string | null>(null);
    useEffect(()=>{
        const storedUSer = localStorage.getItem("user");

        if(storedUSer){
            setUser(storedUSer);
        }
    }, []);

    function Login(email:string){
        setUser(email);
        localStorage.setItem("user", email);
    }

    function Logout(){
        setUser(null);
        localStorage.removeItem("user");
    }
    
    return(
        <AuthContext.Provider 
            value={{
            user, 
            isAuthenticated: !!user, 
            login: Login, 
            logout: Logout}}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}
