import video from "/banner/main-banner.mp4"

const Banner = () => {
    return (
        <div className="relative">
            <div>
                <video src={video} autoPlay muted loop className="h-[70vh] w-full object-cover"></video>
            </div>

            <div className="h-full w-full bg-gradient-to-r from-black to-slate-800 absolute top-0 opacity-70 left-0">

            </div>

            <div className="w-full absolute top-1/2 z-20">
                <div>
                    <h2 className="text-white font-bold text-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl -mt-6">Welcome to
                        <br />
                        <span className="text-[#DC5F00] text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">PrimeAuto BD</span></h2>
                </div>

                <div className="flex items-center justify-center gap-2 md:gap-4 mt-4 xl:mt-8">
                    <button className="px-4 md:px-6 py-2 xl:py-4 xl:px-12 rounded-sm border border-[#DC5F00] hover:bg-[#DC5F00] text-[#DC5F00] hover:text-white font-bold text-xs md:text-sm lg:text-lg xl:text-2xl ease-in-out duration-300">Buy</button>
                    <button className="px-4 md:px-6 py-2 xl:py-4 xl:px-12 rounded-sm border border-[#DC5F00] hover:bg-[#DC5F00] text-[#DC5F00] hover:text-white font-bold text-xs md:text-sm lg:text-lg xl:text-2xl ease-in-out duration-300">Pre-Order</button>
                    <button className="px-4 md:px-6 py-2 xl:py-4 xl:px-12 rounded-sm border border-[#DC5F00] hover:bg-[#DC5F00] text-[#DC5F00] hover:text-white font-bold text-xs md:text-sm lg:text-lg xl:text-2xl ease-in-out duration-300">Rent</button>
                </div>
            </div>

        </div>
    );
};

export default Banner;