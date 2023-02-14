import React from "react";



export const Hero = () => {

    return (
        <div className='relative px-6 lg:px-8'>
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div className='text-center'>
                    <h1 className="text-1xl font-bold tracking-tight text-gray-900 sm:text-2xl">Hello There. I'm</h1>
                    <h1 className="text-4xl font-bold tracking-tight text-plum-900 sm:text-6xl py-2">
                        Sasitha Madushanka
                    </h1>
                    <h1 className="text-1xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        A Full Stack Developer
                    </h1>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href="#about_me"
                            className="rounded-md bg-bramble-700 px-3.5 py-1.5 text-xs lg:text-base font-semibold leading-7 text-white shadow-sm hover:bg-bramble-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bramble-600"
                        >
                            Contact Me
                        </a>
                        <a href="#projects" className=" text-sm lg:text-base font-semibold leading-7 text-gray-900">
                            Learn More
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}