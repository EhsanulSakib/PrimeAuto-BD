import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Root = () => {
    const { darkMode } = useContext(AuthContext)

    return (
        <div className={`${darkMode ? 'bg-gray-800 text-slate-100' : 'bg-slate-100 text-gray-800'} font-raleway`}>
            <div className={`max-w-2xl m-auto min-h-screen text-xs md:text-sm lg:text-base xl:text-xl`} >

            </div >
        </div>
    );
};

export default Root;