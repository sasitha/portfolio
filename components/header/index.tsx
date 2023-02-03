import React, { useState } from "react";
import { Dialog } from '@headlessui/react'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
    ArrowPathIcon,
    Bars3Icon,
    BookmarkSquareIcon,
    CalendarIcon,
    ChartBarIcon,
    CursorArrowRaysIcon,
    LifebuoyIcon,
    PhoneIcon,
    PlayIcon,
    ShieldCheckIcon,
    Squares2X2Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import classNames from "classnames";

export const Header = () => {
    const navigation = [
        { name: 'Home', href: '#' },
        { name: 'Projects', href: '#' },
        { name: 'Blog', href: '#' },
    ]
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const solutions = [
        {
            name: 'Analytics',
            description: 'Get a better understanding of where your traffic is coming from.',
            href: '#',
            icon: ChartBarIcon,
        },
        {
            name: 'Engagement',
            description: 'Speak directly to your customers in a more meaningful way.',
            href: '#',
            icon: CursorArrowRaysIcon,
        },
        { name: 'Security', description: "Your customers' data will be safe and secure.", href: '#', icon: ShieldCheckIcon },
        {
            name: 'Integrations',
            description: "Connect with third-party tools that you're already using.",
            href: '#',
            icon: Squares2X2Icon,
        },
        {
            name: 'Automations',
            description: 'Build strategic funnels that will drive your customers to convert',
            href: '#',
            icon: ArrowPathIcon,
        },
    ]
    const callsToAction = [
        { name: 'Watch Demo', href: '#', icon: PlayIcon },
        { name: 'Contact Sales', href: '#', icon: PhoneIcon },
    ]
    const resources = [
        {
            name: 'Help Center',
            description: 'Get all of your questions answered in our forums or contact support.',
            href: '#',
            icon: LifebuoyIcon,
        },
        {
            name: 'Guides',
            description: 'Learn how to maximize our platform to get the most out of it.',
            href: '#',
            icon: BookmarkSquareIcon,
        },
        {
            name: 'Events',
            description: 'See what meet-ups and other events we might be planning near you.',
            href: '#',
            icon: CalendarIcon,
        },
        { name: 'Security', description: 'Understand how we take your privacy seriously.', href: '#', icon: ShieldCheckIcon },
    ]
    const recentPosts = [
        { id: 1, name: 'Boost your conversion rate', href: '#' },
        { id: 2, name: 'How to use search engine optimization to drive traffic to your site', href: '#' },
        { id: 3, name: 'Improve your customer experience', href: '#' },
    ]
    return (
        <Popover className="relative z-50">
            <div className="w-full px-6 fixed bg-white">
                <div className="flex items-center justify-between  py-3 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <a href="#">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto sm:h-10"
                                src="/SM_logo.png"
                                alt=""
                            />
                        </a>
                    </div>
                    <div className="-my-2 -mr-2 md:hidden">
                        <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Open menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <a key={item.name} href={item.href} className="text-md font-bold leading-6 text-plum-900">
                                {item.name}
                            </a>
                        ))}
                    </div>
                    <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">

                        <a
                            href="#"
                            className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-bramble-700 px-4 py-1 text-sm font-bold text-white shadow-sm hover:bg-bramble-900"
                        >
                            Download CV
                        </a>
                    </div>
                </div>
            </div>

            <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Popover.Panel focus className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
                    <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="px-5 pt-5 pb-10">
                            <div className="flex items-center justify-between">
                                <div>
                                    <img
                                        className="h-8 w-auto"
                                        src="/SM_logo.png"
                                        alt="Your Company"
                                    />
                                </div>
                                <div className="-mr-2">
                                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </Popover.Button>
                                </div>
                            </div>
                            <div className="mt-6">
                                <nav className="grid gap-y-8">
                                    {navigation.map((item) => (
                                        <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                                            {item.name}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </div>
                        <div className="space-y-6 py-6 px-5">
                            <div>
                                <a
                                    href="#"
                                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-bramble-700 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-indigo-700"
                                >
                                    Download CV
                                </a>
                            </div>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}