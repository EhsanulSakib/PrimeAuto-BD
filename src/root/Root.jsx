import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Navbar from "../components/navbar/Navbar";
import { Outlet } from "react-router-dom";

const Root = () => {
    const { darkMode } = useContext(AuthContext)

    return (
        <div className={`${darkMode ? 'bg-[#373A40] text-[#EEEEEE]' : 'bg-[#EEEEEE] text-[#373A40]'} font-rubik`}>
            <div className={`max-w-[2048px] m-auto min-h-screen text-xs md:text-sm lg:text-base xl:text-xl 2xl-text-2xl`} >
                <Navbar></Navbar>
                <Outlet></Outlet>
            </div >
        </div>
    );
};

export default Root;