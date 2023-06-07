import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../Firebase/firebase.config";



const auth = getAuth(app)
export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) =>{
        return signInWithEmailAndPassword(email, password)
    }

    const logOut = ()=>{
        setLoading(true)
        signOut()
    }
    
    useEffect(()=>{
      const unsubscribe =   onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            console.log("current user", currentUser);
            setLoading(false)
        })
        return()=>{
            return unsubscribe()
        }
    },[])
    
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut
    }
    


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;