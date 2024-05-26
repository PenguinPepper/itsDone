/* eslint-disable */
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './index.css'
import Dashboard from './pages/dashboard';
import Login from './pages/login'
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import Tasks from './pages/tasks';
import { Toaster } from 'sonner';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import { useRef, Fragment } from 'react';
import { toggleSidebar } from './redux/slices/authSlice';
import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import { IoClose } from 'react-icons/io5';
import Trash from './pages/trash';
import TaskDetails from './pages/taskDetails';


const MobileSidebar = () => {
  const { isSideBarOpen } = useSelector(state => state.auth);
  const mobileMountRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <>
      <Transition
        show={isSideBarOpen}
        as={Fragment}
        enter="transition-opacity duration-700"
        enterFrom="opacity-x-10"
        enterTo="opacity-x-100 scale-100"
        leave="transition-opacity duration-700"
        leaveFrom="opacity-x-100 scale-100"
        leaveTo="opacity-x-0 scale-95"
      >
        {(ref) => (
          <article
            ref={(node) => (mobileMountRef.current = node)}
            className={clsx('md:hidden w-full h-full bg-black/40 transition-all duration-700 transform ', isSideBarOpen ? 'translate-x-0' : 'translate-x-full'
            )}
            onClick={() => closeSidebar()}
          >
            <article className='bg-white w-3/4 h-full'>
              <article className='w-full flex justify-end px-5 mt-5'>
                <button
                  onClick={() => closeSidebar()}
                  className='flex justify-end items-end'
                >
                  <IoClose size={25} />
                </button>
              </article>
              <article className='-mt-10'>
                <Sidebar />
              </article>
            </article>
          </article>
        )}
      </Transition>

    </>
  )

}

function Layout() {
  const { user } = useSelector(state => state.auth);

  const location = useLocation();

  return user ? (

    <section className='w-full h-screen flex flex-col md:flex-row'>
      <section className='w-1/5 h-screen bg-white sticky top-0 hiddeb mg:block'>
        <Sidebar />
      </section>
      <MobileSidebar />
      <section className='flex-1 overflow-y-auto'>
        <Navbar />
      </section>
      <section className='p-4 2xl:px-10'>
        < Outlet />
      </section>
    </section>
  ) : (
    <Navigate to="login" state={{ from: location }} replace />
  )
}

function App() {


  return (
    <main className='w-full min-h-screen bg-[#]'>
      <Routes>
        <Route element={<Layout />} >
          <Route path="/" element={<Navigate to="dashboard" />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/task' element={<Tasks />} />
          <Route path='/completed:status' element={<Tasks />} />
          <Route path='/in-progress:status' element={<Tasks />} />
          <Route path='/todo:status' element={<Tasks />} />
          <Route path="/trashed" element={<Trash />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Route>

        <Route path='/login' element={<Login />} />
      </Routes>
      <Toaster richColors />
    </main>
  )
}

export default App
