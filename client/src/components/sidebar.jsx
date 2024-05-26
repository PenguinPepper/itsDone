/*eslint-disable */
import React from 'react';
import {
    MdDashboard,
    MdOutlineAddTask,
    MdOutlinePendingActions,
    MdSettings,
    MdTaskAlt,
} from 'react-icons/md';

import { FaTasks, FaTrashAlt, FaUsers } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../redux/slices/authSlice';
import clsx from 'clsx';


const linkData = [
    {
        id: 1,
        label: 'Dashboard',
        icon: <MdDashboard />,
        link: 'dashboard',
    },
    {
        id: 2,
        label: 'Tasks',
        icon: <FaTasks />,
        link: 'tasks',
    },
    {
        id: 3,
        label: 'Completed',
        icon: <MdTaskAlt />,
        link: 'completed/completed',
    },
    {
        id: 4,
        label: 'In Progress',
        icon: <MdOutlinePendingActions />,
        link: 'in-progress/in-progress',
    },
    {
        id: 5,
        label: 'To Do',
        icon: <MdOutlinePendingActions />,
        link: '/settings',
    },
    {
        id: 6,
        label: 'Trash',
        icon: <FaTrashAlt />,
        link: 'trashed',
    },
];


const Sidebar = () => {

    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();

    const path = location.pathname.split('/')[1];

    const closeSidebar = () => {
        dispatch(toggleSidebar());
    }

    const NavLink = ({ el }) => {
        return <Link to={el.link} onClick={closeSidebar}
            className={clsx("w-full lg:w-3/4 flex gap-2 items-center px-3 py-2 rounded-lg text-gray-800 text-base hover:bg-[#2564ed2d]", path === el.link.split("/")[0] ? "bg-blue-700 text-neutral-100" : "")}>

            {el.icon}
            <span className='hover:text-[#2564ed]'>{el.label}</span>
        </Link>
    }

    return (
        <div className="w-full h-full flex flex-col gap-6 p-5">
            <h1 className='flex gap-1 items-center'>
                <p className='bg-blue-600 p-2 round-full'>
                    <MdOutlineAddTask className='text-white text-2xl font-black' />
                </p>
                <span className='text-2xl font-bold text-black'>
                    TaskMe
                </span>
            </h1>
            <section className="flex-1 flex flex-col gap-y-5 py-8">
                {
                    linkData.map((link) => {
                        <NavLink el={link} key={link.label} />
                    })
                }
            </section>
            <section className='w-full flex gap-2 p-2 items-center text-lg text-gray-800 dark:text-white'>
                <MdSettings />
                <span>Settings</span>
            </section>
        </div>
    );
};

export default Sidebar;