import {useState, useEffect, useContext, createContext} from "react";
import axios from "axios";
const AuthContext = createContext();

const AuthProvider = ({children})=>{
    const [auth, setAuth] = useState({
        user:null,
        token:""
    });

    // default axios
    axios.defaults.headers.common["Authorization"] = auth?.token

    useEffect(()=>{
        const data = localStorage.getItem("auth");
        if(data){
          const parsedData = JSON.parse(data)
          setAuth({
            ...auth,
            user:parsedData.data,
            token:parsedData.token
          })
        }
    },[])

    return(
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

// custom hook 
const useAuth = ()=> useContext(AuthContext)

export {useAuth, AuthProvider}
