import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import { AuthContext } from "../../provider/AuthProvider";

const Register = () => {
    const { setUser, createUser } = useContext(AuthContext);
    const { register, handleSubmit, reset } = useForm();
    const [show, setShow] = useState(false);
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const notifyError = errorName => toast.error(errorName);



    const onSubmit = (data) => {
        const { name, photo, email, password } = data;

        if (password.length < 6) {
            notifyError("Password should be at least 6 characters or longer.")
            return
        }

        else if (!/[A-Z]/.test(password)) {
            notifyError("Password should Contain At least a Uppercase Letter")
            return
        }

        else if (!/[a-z]/.test(password)) {
            notifyError("Password should Contain At least a Lowercase Letter")
            return
        }


        createUser(email, password)
            .then(result => {
                updateProfile(result.user, {
                    displayName: name, photoURL: photo
                })
                    // .then(() => {
                    //     const userInfo = {
                    //         name: data.name,
                    //         email: data.email,
                    //         role: "user"
                    //     }
                    //     axiosPublic.post('/users', userInfo)
                    //         .then(res => {
                    //             if (res.data.insertedId) {
                    //                 console.log('user added to the database')
                    //                 reset();
                    //                 Swal.fire({
                    //                     icon: 'success',
                    //                     title: 'User created successfully.',
                    //                     showConfirmButton: false,
                    //                     timer: 1500
                    //                 });
                    //                 navigate('/');
                    //             }
                    //         })
                    // })
                    .catch(error => notifyError(error.message.split('(').pop().split(')')[0].split('/')[1]))
            })
    }


    return (
        <div className="min-h-screen flex items-center justify-center relative">
            <div>
                <img src="https://i.ibb.co/9yLWmDy/luxurious-car-parked-highway-with-illuminated-headlight-sunset-1.jpg" alt="" className="h-full absolute top-0 left-0 object-cover object-center w-full" />
            </div >

            <div className="h-full absolute top-0 left-0 object-cover object-center w-full bg-gradient-to-r from-slate-950 to-slate-500 opacity-40">

            </div>
            <div className="my-8 py-4 flex gap-4 rounded-xl flex-col items-center justify-center w-11/12 md:w-1/2 xl:w-2/5 md:py-8 lg:py-12 shadow-xl z-10 backdrop-blur-lg bg-gradient-to-r from-[rgba(255,255,255,0.9)] to-[rgba(255,255,255,0.6)] text-black">
                <h2 className="text-2xl text-[#DC5F00] font-bold">Please Register</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="w-11/12">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-sm md:text-base lg:text-lg xl:text-xl text-black">Your Name</span>
                        </label>
                        <input required type="text" name="name" placeholder="Enter your name" className="input input-bordered bg-inherit" {...register("name")} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-sm md:text-base lg:text-lg xl:text-xl text-black">Photo URL</span>
                        </label>
                        <input required type="text" name="photo" placeholder="Enter photo link" className="input input-bordered bg-inherit" {...register("photo")} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-sm md:text-base lg:text-lg xl:text-xl text-black">Email</span>
                        </label>
                        <input required type="email" name="email" placeholder="Enter your Email" className="input input-bordered bg-inherit" {...register("email")} />
                    </div>
                    <div required className="form-control">
                        <label className="label">
                            <span className="label-text text-sm md:text-base lg:text-lg xl:text-xl text-black">Password</span>
                        </label>
                        <div className="w-full relative">
                            <input type={show ? "text" : "password"} name="password" placeholder="Password" className="w-full input input-bordered bg-inherit" {...register("password")} />
                            <span className="absolute right-3 top-3 text-2xl cursor-pointer" onClick={() => setShow(!show)}>
                                {
                                    show ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                }
                            </span>
                        </div>
                        <label className="label">
                            <div className="flex gap-2">
                                <input type="checkbox" required name="terms" id="terms" className="label-text text-sm md:text-base lg:text-lg xl:text-xl" />
                                <p>Accept <Link className="font-bold no-underline ">Term & Conditions</Link></p>
                            </div>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-[#DC5F00] border-none hover:bg-[#dc5f00cc] text-white text-lg font-bold">Register</button>
                    </div>
                </form>
                <div>
                    <p>Already have any account? <Link to='/login' className="no-underline text-[#DC5F00] hover:text-[#dc5f00cc] font-bold">Login Now</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;