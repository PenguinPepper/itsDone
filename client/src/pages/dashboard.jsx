/* eslint-disable */
import React from 'react';
import {
    MdKeyboardArrowDown,
    MdKeyboardArrowUp,
    MdKeyboardDoubleArrowUp
} from 'react-icons/md';
import { LuClipboardEdit } from 'react-icons/lu';
import { FaNewspaper, FaUsers } from 'react-icons/fa';
import { FaArrowsToDot } from 'react-icons/fa6';
import moment from 'moment';
import clsx from 'clsx';
import Chart from '../components/chart';
import { useGetDashboardStatsQuery } from "../redux/slices/api/taskApiSlice"
import { BGS, PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../utils"
import Loading from "../components/loader"
import UserInfo from "../components/userInfo"

const TaskTable = ({ tasks }) => {
    const ICONS = {
        low: <MdKeyboardArrowDown />,
        medium: <MdKeyboardArrowUp />,
        high: <MdKeyboardArrowUp />,
    };

    const tableHeader = () => (
        <thead className='border-b border-gray-300'>
            <tr className='text-black text-left'>
                <th className='py-2 '>Task</th>
                <th className='py-2 '>Priority</th>
                <th className='py-2 '>Due Date</th>
                <th className='py-2 hidden md:block'>Actions</th>
            </tr>
        </thead>
    );
    const TableRow = ({ task }) => (
        <tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10">
            <td className="py-2">
                <section className="flex items-center gap-2">
                    <div
                        className={clsx(
                            "w-4 h-4 rounded-full",
                            TASK_TYPE[task.stage]
                        )}
                    />

                    <p className="text-base text-black">{task.title}</p>
                </section>
            </td>

            <td className="py-2">
                <article className="flex gap-1 items-center">
                    <span
                        className={clsx(
                            "text-lg",
                            PRIOTITYSTYELS[task.priority]
                        )}
                    >
                        {ICONS[task.priority]}
                    </span>
                    <span className="capitalize">{task.priority}</span>
                </article>
            </td>

            <td className="py-2">
                <article className="flex">
                    {task.team.map((m, index) => (
                        <article
                            key={index}
                            className={clsx(
                                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                                BGS[index % BGS.length]
                            )}
                        >
                            <UserInfo user={m} />
                        </article>
                    ))}
                </article>
            </td>
            <td className="py-2 hidden md:block">
                <span className="text-base text-gray-600">
                    {moment(task?.date).fromNow()}
                </span>
            </td>
        </tr>
    )

    return (
        <>
            <section className='w-full md:w-2/3 bg-white px-2 md:-4 pt-4 pb-4 shadow-md'>
                <table>
                    <tableHeader />
                    <tbody>
                        {tasks?.map((task, id) => (
                            <TableRow key={id} task={task} />
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    )
}

const UserTable = ({ users }) => {
    const TableHeader = () => (
        <thead className="border-b border-gray-300 ">
            <tr className="text-black  text-left">
                <th className="py-2">Full Name</th>
                <th className="py-2">Status</th>
                <th className="py-2">Created At</th>
            </tr>
        </thead>
    )

    const TableRow = ({ user }) => (
        <tr className="border-b border-gray-200  text-gray-600 hover:bg-gray-400/10">
            <td className="py-2">
                <section className="flex items-center gap-3">
                    <section className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-violet-700">
                        <span className="text-center">
                            {getInitials(user?.name)}
                        </span>
                    </section>

                    <section>
                        <p> {user.name}</p>
                        <span className="text-xs text-black">{user?.role}</span>
                    </section>
                </section>
            </td>

            <td>
                <p
                    className={clsx(
                        "w-fit px-3 py-1 rounded-full text-sm",
                        user?.isActive ? "bg-blue-200" : "bg-yellow-100"
                    )}
                >
                    {user?.isActive ? "Active" : "Disabled"}
                </p>
            </td>
            <td className="py-2 text-sm">
                {moment(user?.createdAt).fromNow()}
            </td>
        </tr>
    )

    return (
        <div className="w-full md:w-1/3 bg-white h-fit px-2 md:px-6 py-4 shadow-md rounded">
            <table className="w-full mb-5">
                <TableHeader />
                <tbody>
                    {users?.map((user, index) => (
                        <TableRow key={index + user?._id} user={user} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const Dashboard = () => {
    const { data, isLoading } = useGetDashboardStatsQuery()

    if (isLoading) {
        return (
            <section className="py-10">
                <Loading />
            </section>
        )
    }

    const totals = data?.tasks
    const stats = [
        {
            _id: "1",
            label: "TOTAL TASK",
            total: data?.totalTasks || 0,
            icon: <FaNewspaper />,
            bg: "bg-[#1d4ed8]",
        },
        {
            _id: "2",
            label: "COMPLTED TASK",
            total: totals["completed"] || 0,
            icon: <MdAdminPanelSettings />,
            bg: "bg-[#0f766e]",
        },
        {
            _id: "3",
            label: "TASK IN PROGRESS ",
            total: totals["in progress"] || 0,
            icon: <LuClipboardEdit />,
            bg: "bg-[#f59e0b]",
        },
        {
            _id: "4",
            label: "TODOS",
            total: totals["todo"],
            icon: <FaArrowsToDot />,
            bg: "bg-[#be185d]" || 0,
        },
    ]

    const Card = ({ icon, bg, label, total }) => {
        return (
            <section className={`w-full h-32 bg-white shadow-md flex  items-center justify-between  p-5 rounded-md `}>
                <section className=' h-full flex flex-1 flex-col justify-between '>
                    <p className='text-base text-gray-600'>{label}</p>
                    <span className='text-2xl font-semibold'>{count}</span>
                    <span className='text-sm text-gray-400'>{"10"}</span>
                </section>
                <section className={clsx("w-full h-10 rounded-full flex items-center justify-center text-white", bg)}>
                    {icon}
                </section>
            </section>)
    }
    return (
        <section className='h-full py-4'>
            <section className='grid grid-col-1 md:grid-cols-4 gap-5'>
                {stats.map(({ icon, bg, label, total }) => (
                    <Card
                        key={_id}
                        icon={icon}
                        bg={bg}
                        label={label}
                        total={total}
                    />
                ))}
            </section>
            <section className='w-full bg-white p-4 my-16 rounded shadow-sm'>
                <h4 className='text-xl text-gray-600 font-semibold'>Chart Prioroty</h4>
                <Chart />
            </section>
            <section className='w-full flex flec-col md:flex-row gap-4 2xl:gap-10 py-8'>
                <section className='w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8'>
                    <TaskTable
                        tasks={data?.last10Task}
                    />
                    <UserTable
                        users={data?.users}
                    />
                </section>
            </section>

        </section>
    );
};

export default Dashboard;