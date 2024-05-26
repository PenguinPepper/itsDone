/* eslint-disable*/
import React from 'react';
import clsx from 'clsx';

const Textbox = React.forwardRef(
    ({ type, placeholder, label, className, register, name, error }, ref) => {
        return (<section className='w-full flex flex-col gap-1'>
            {label && (<label htmlFor={name} className='text-slate-800'>
                {label}
            </label>)}

            <section>
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    ref={ref}
                    {...register}
                    aria-invalid={error ? "true" : "false"}
                    className={clsx("bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-400 text-gray-900 outline-none text-base focus-ring-2 ring-blue-300", className)}
                />
            </section>
            {error && (
                <span className='text-red-500 text-xs mt-5'>{error}</span>
            )}

        </section>
        );
    }
);

export default Textbox;