/* eslint-disable */
import React from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { FiAlignJustify } from "react-icons/fi";
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../redux/slices/authSlice';
import UserAvator from './userAvator';
import Notification from './notification';

const Navbar = () => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();


    return (
        <nav className='flex justify-between items-center bg-white px-4 py-3 2xl:py-4 sticky z-10 top-0'>
            <section className='flex gap-4'>
                <button className='text-2xl text-gray-500 block md:hidden' onClick={() => dispatch(toggleSidebar)}>
                    <FiAlignJustify />
                </button>

                <article className='w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-3xl bg-[#f3f4f6]'>
                    <MdOutlineSearch className='text-gray-500 text-xl' />
                    <input type='text' placeholder='Search...' className='flex-1 bg-transparent outline-none placeholder:text-gray-500 text-gray-800' />
                </article>
            </section>
            <section classsName='w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6]'>
                <MdOutlineSearch className="text-gray-500 text-xl" />

                <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800"
                />
            </section>

            <section className='flex gap-2 items-center'>
                <Notification />
                <UserAvator />
            </section>
        </nav>
    );
};

export default Navbar;