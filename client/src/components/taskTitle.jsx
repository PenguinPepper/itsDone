/* eslint-disable*/
import clsx from "clsx"
import React from "react"
import { IoMdAdd } from "react-icons/io"

const TaskTitle = ({ label, className }) => {
    return (
        <section className="w-full h-10 md:h-12 px-2 md:px-4 rounded bg-white flex items-center justify-between">
            <section className="flex gap-2 items-center">
                <div className={clsx("w-4 h-4 rounded-full ", className)} />
                <p className="text-sm md:text-base text-gray-600">{label}</p>
            </section>

            <button className="hidden md:block">
                <IoMdAdd className="text-lg text-black" />
            </button>
        </section>
    )
}

export default TaskTitle