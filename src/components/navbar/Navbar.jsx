import { Link, NavLink, useNavigate } from "react-router-dom";
import { RiMenu2Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useContext, useState } from "react";
import logo from '/logo/logo.png'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { AuthContext } from "../../provider/AuthProvider";

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const { user, logOut, darkMode, setDarkMode, isAdmin } = useContext(AuthContext)
    const notify = () => toast.error("User Signed Out!");
    const navigate = useNavigate()

    const handleSignOut = () => {
        logOut()
            .then(() => {
                navigate('/')
            })
            .then(notify)
            .catch()
    }

    const links = <>
        <ul className={`xl:flex flex-row gap-2 duration-300 top-10 md:top-[2.5rem] lg:top-12 absolute ${darkMode ? 'bg-[#373A40]' : 'bg-[#EEEEEE]'} xl:static ${open ? 'left-0' : '-left-60'} p-10 xl:p-0 shadow-lg xl:shadow-none no-underline xl:gap-6 z-50 font-bold text-base xl:text-xl 2xl:text-2xl text-[#DC5F00]`}>
            <li className="pb-1 xl:pb-0"><NavLink className={'focus:border-b-2 '} to='/'>Home</NavLink></li>

            {
                user ?
                    <li className="mt-8 xl:mt-0 rounded-md xl:hidden focus:border-b-2" onClick={handleSignOut}>Sign Out</li>
                    :
                    <li className="mt-8 xl:mt-0 rounded-md xl:hidden">
                        <NavLink to='/login' className={'focus:border-b-2 '}>Login</NavLink>
                    </li>
            }

            {
                user ?
                    ""
                    :
                    <li className="xl:hidden"><NavLink className={'focus:border-b-2 '} to='/register'>Register</NavLink></li>
            }
        </ul>
    </>
    return (
        <nav className="flex items-center px-2 xl:px-4 py-1 xl:py-2 justify-between m-auto text-xl font-medium  ">
            <div className="flex items-center xl:hidden">
                <div className="xl:hidden" onClick={() => setOpen(!open)}>
                    {
                        open == true ? <IoMdClose className="text-2xl " /> : <RiMenu2Line className="text-2xl " />
                    }
                </div>

                <div className="logo flex text-base xl:hidden items-center">
                    <img src={logo} alt="" className="w-12 pl-2" />
                    <h2 className="text-[#DC5F00] text-xl font-extrabold ml-1">PrimeAuto BD</h2>
                </div>
            </div>

            <div className="logo hidden xl:flex items-center ">
                <img src={logo} alt="" className="w-20 pl-2" />
                <h2 className="text-[#DC5F00] text-4xl font-extrabold ml-2">PrimeAuto BD</h2>
            </div>


            <div className="flex flex-col xl:gap-8 xl:flex-row items-center">


                <div>
                    {links}
                </div>

                <div className="flex items-center z-10">
                    <div className="mr-2">
                        {
                            darkMode ?
                                <button className="btn btn-sm lg:btn-md btn-circle border-none btn-ghost text-white hover:bg-transparent text-xl lg:text-2xl shadow-none" onClick={() => setDarkMode(!darkMode)}>
                                    <MdLightMode />
                                </button>

                                :
                                <button className="btn btn-sm lg:btn-md btn-circle btn-ghost hover:bg-transparent border-none text-gray-800 text-xl lg:text-2xl shadow-none" onClick={() => setDarkMode(!darkMode)}>
                                    <MdDarkMode />
                                </button>

                        }
                    </div>
                    <div>
                        {
                            user && !isAdmin ?
                                <div className="dropdown dropdown-bottom dropdown-end ">
                                    <div tabIndex={0} role="button" className=""><img src={user.photoURL} alt="" className="w-8 lg:w-12 h-8 lg:h-12 object-cover object-top rounded-full" /></div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 mt-1 rounded-md w-52 border border-gray-400 bg-slate-100 shadow-lg">
                                        <h2 className="font-bold text-center lg:text-lg text-black">{user.displayName}</h2>
                                        <Link to='/dashboard'><button className="btn bg-transparent text-black border border-[#DC5F00] hover:bg-[#DC5F00] duration-300 ease-in-out btn-sm hover:border-[#DC5F00] w-full mt-2 hover:text-white rounded-sm mb-2">
                                            Dashboard
                                        </button></Link>
                                        <Link><button className="btn border-none bg-[#DC5F00] hover:bg-[#dc5f00cc] btn-sm w-full my-1 text-white rounded-sm" onClick={handleSignOut}>
                                            Logout
                                        </button></Link>
                                    </ul>
                                </div>

                                :
                                ""
                        }

                        {
                            isAdmin ?
                                <div className="dropdown dropdown-bottom dropdown-end ">
                                    <div tabIndex={0} role="button" className=""><img src={user.photoURL} alt="" className="w-8 lg:w-12 h-8 lg:h-12 object-cover object-top rounded-full" /></div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 mt-1 rounded-md w-44 border border-gray-400 bg-slate-100 shadow-lg">
                                        <h2 className="font-bold text-center text-black">{user.displayName}</h2>
                                        <Link to='/admin-dashboard/'><button className="btn border-none bg-blue-600 hover:bg-blue-500 btn-sm w-full mt-2 text-white rounded-sm">
                                            Dashboard
                                        </button></Link>
                                        <Link><button className="btn border-none bg-red-800 hover:bg-red-600 btn-sm w-full my-1 text-white rounded-sm" onClick={handleSignOut}>
                                            Logout
                                        </button></Link>
                                    </ul>
                                </div>
                                :
                                ""
                        }
                    </div>

                    <div className="hidden xl:flex">
                        {
                            user ?
                                ""
                                :
                                <button className="btn border-2 border-[#DC5F00] text-[#DC5F00] bg-transparent hover:bg-[#DC5F00] hover:border-[#DC5F00] hover:text-white rounded-md text-sm lg:text-xl font-semibold">
                                    <Link to='/login'>Login</Link>
                                </button>
                        }
                    </div >

                    <div className="hidden xl:flex">
                        {
                            user ?
                                ""
                                :
                                <button className="btn ml-3 bg-[#DC5F00] hover:bg-[#dc5f00e3] rounded-md text-sm lg:text-xl border-[#DC5F00] hover:border-[#DC5F00] text-white font-medium" ><Link to='/register'>Register</Link></button>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;