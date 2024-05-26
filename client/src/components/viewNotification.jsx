/* eslint-disable */
import React from "react"
import ModalWrapper from "./modalWrapper"
import { Dialog } from "@headlessui/react"
import Button from "./button"

const ViewNotification = ({ open, setOpen, el }) => {
    return (
        <>
            <ModalWrapper open={open} setOpen={setOpen}>
                <section className="py-4 w-full flex flex-col gap-4 items-center justify-center">
                    <DialogTitle as="h3" className="font-semibold text-lg">
                        {el?.task?.title}
                    </DialogTitle>

                    <p className="text-start text-gray-500">{el?.text}</p>

                    <Button
                        type="button"
                        className="bg-white px-8 mt-3 text-sm font-semibold text-gray-900 sm:w-auto border border-gray-300 rounded-md"
                        onClick={() => setOpen(false)}
                        label="Ok"
                    />
                </section>
            </ModalWrapper>
        </>
    )
}

export default ViewNotification