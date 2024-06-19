import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";
import { createContext, useEffect, useState } from "react";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic/useAxiosPublic";

export const AuthContext = createContext(null)
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(null)
    const [adminLoading, setAdminLoading] = useState(true)
    const [applied, setApplied] = useState([])
    const [isMember, setIsMember] = useState([])
    const [memberLoading, setMemberLoading] = useState(true)

    const axiosPublic = useAxiosPublic()
    const GoogleProvider = new GoogleAuthProvider()
    const GitHubProvider = new GithubAuthProvider()

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const handleGoogleSignIn = () => {
        return signInWithPopup(auth, GoogleProvider)

    }

    const handleGitHubSignIn = () => {
        return signInWithPopup(auth, GitHubProvider)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setAdminLoading(true)
            if (currentUser) {
                // get token and store client
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            axiosPublic.get(`/members/${currentUser.email}`)
                                .then(res => {
                                    setIsMember(res.data)
                                    setMemberLoading(false)
                                })
                            axiosPublic.get(`/agreement/${currentUser.email}`)
                                .then(res => {
                                    setApplied(res.data)
                                })
                            axiosPublic.get(`/users/admin/${currentUser.email}`)
                                .then(res => {
                                    console.log(res.data)
                                    setIsAdmin(res.data.admin)
                                    setAdminLoading(false)
                                })
                            setLoading(false);
                        }
                    })
            }
            else {
                // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
                localStorage.removeItem('access-token');
                setAdminLoading(false)
                setLoading(false);
            }
        });
        return () => {
            return unsubscribe();
        }
    }, [axiosPublic])

    useEffect(() => {
        setLoading(true)

    }, [])


    const userInfo = { isMember, memberLoading, applied, setApplied, isAdmin, adminLoading, setAdminLoading, loading, user, darkMode, setDarkMode, logOut, signIn, handleGoogleSignIn, handleGitHubSignIn, createUser }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;