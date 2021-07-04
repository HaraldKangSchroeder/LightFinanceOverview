import { useState, createContext, useEffect} from "react";

interface Value {
    auth: boolean,
    setAuth : (auth : boolean) => void,
    username : string,
    setUsername : (username : string) => void,
}

export const AuthContext = createContext<Value>(null);

interface Props {
    auth : boolean, 
    setAuth : (auth : boolean) => void,
    username : string,
    children? : any
}

export function AuthProvider(props : Props) {

    const [username, setUsername] = useState(props.username);
    useEffect(() => {
        setUsername(props.username);
    },[props.username])

    return (
        <AuthContext.Provider value={{ auth: props.auth, setAuth: props.setAuth, username : username, setUsername : setUsername}}>
            {props.children}
        </AuthContext.Provider>
    )
}