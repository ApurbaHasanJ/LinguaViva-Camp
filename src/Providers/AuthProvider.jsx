import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../Firebase/firebase.config";



const auth = getAuth(app)
export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();

    // Handle create user
    const createUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // Update User profile
  const userProfile = (displayName, photoURL) => {
    const user = auth.currentUser;
    return updateProfile(user, { displayName, photoURL });
  };

//   User Sign In
    const signIn = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Continue With Google
    const continueWithGoogle = ()=>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
      }

    //   Handle logout
    const logOut = ()=>{
        setLoading(true)
        return signOut(auth)
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
        userProfile,
        signIn,
        continueWithGoogle,
        logOut
    }
    


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;