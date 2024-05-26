/* eslint-disable */
import React, { Fragment, useState } from 'react';
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import moment from 'moment';
import { BiSolidMessageRounded } from 'react-icons/bi';
import { GoBell } from "react-icons/go";
import { IoIosNotificationsOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import {
    useGetNotificationsQuery,
    useMarkNotiAsReadMutation,
} from "../redux/slices/api/userApiSlice"
// import ViewNotification from "./viewNotification"

const data = []

const ICONS = {
    alert: (
        <GoBell className="w-5 h-5 text-gray-600 group-hover:text-indigo-600" />
    ),
    message: (
        <BiSolidMessageRounded className="w-5 h-5 text-gray-600 group-hover:text-indigo-600" />
    ),
};

const Notification = ({ message }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const { data, refetch } = useGetNotificationsQuery();
    const [markAsRead] = useMarkNotiAsReadMutation();

    const readHandler = async (type, id) => {
        await markAsRead({ type, id }).unwrap()

        refetch()
    }
    const viewHandler = async (el) => {
        setSelected(el)
        readHandler("one", el._id)
        setIsOpen(true)
    }


    const callsToAction = [
        { name: 'Cancel', href: '#', icon: '' },
        {
            name: 'Mark all as read',
            href: '#',
            icon: '',
            onClick: () => readHandler('all', ""),
        },
    ];

    return (
        <Popover className="relative">
            <PopoverButton className="inline-flex items-center outline-none">
                <article className='w-8 h-8 flex items-center justify-center text-gray-800 dark:text-white relative'>
                    <IoIosNotificationsOutline className='text-2xl' />
                    {data?.length > 0 && (
                        <span className='absolute top-0 right-1 bg-red-500 text-neutral-100 text-xs rounded-full w-4 h-4'>
                            {data?.length}
                        </span>
                    )}
                </article>
            </PopoverButton>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <PopoverPanel className="absolute -right-16 md:-right-2 z-10 w-screen max-w-max px-4 mt-5">
                    {({ close }) => {
                        data?.length > 0 && (
                            <article className='w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-gray-500'>
                                <article className='p-4'>
                                    {data?.slice(0, 5).map((item, index) => (
                                        <article
                                            key={item._id + index}
                                            className='group relative flex gap-x-4 p-4 hover:bg-gray-300 rounded-lg'
                                        >
                                            <article className='mt-1 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200 group-hover:bg-white'>
                                                {ICONS[item.notiType]}
                                            </article>
                                            <article className='cursor-pointer'
                                                onClick={() => viewHandler(item)}
                                            >
                                                <article className='flex items-center gap-3 font-semibold text-gray-900 capitalize dark:gray-200'>
                                                    <p>{item.notiType}</p>
                                                    <span className='text-xs font-normal lowercase'>
                                                        {moment(item.createdAt).fromNow()}
                                                    </span>
                                                </article>
                                                <p className='line-clamp-1 text-grauy-600 '>
                                                    {item.text}
                                                </p>
                                            </article>
                                        </article>
                                    ))}

                                </article>
                                <article className='grid grid-cols-2 divide-x  bg-gray-50 '>
                                    {callsToAction.map((item) => (
                                        <Link
                                            key={item.name}
                                            onClick={
                                                item.onClick ? () => item.onClick() : () => close()
                                            }
                                            className='flex items-center justify-center gap-x-2.5 p-3 font-semibold text-blue-600 dark:text-gray-200 hover:bg-gray-100  '>
                                            {item.name}
                                        </Link>
                                    ))}
                                </article>
                            </article>
                        )
                    }}
                </PopoverPanel>
            </Transition>
        </Popover>
    );
};

export default Notification;