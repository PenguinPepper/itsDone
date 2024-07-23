import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Checkbox, Description, Field, Label } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/16/solid';
import Textbox from '../components/textbox';
import Button from '../components/button';
// import { useSelector, useDispatch } from 'react-redux';
import { useRegisterMutation, } from "../redux/slices/api/authApiSlice"
import { toast } from "sonner"

// import { setCredentials } from "../redux/slices/authSlice"
import Loading from "../components/loader"

const Login = () => {

    // const { user } = useSelector(state => state.auth);

    const [checked, setChecked] = useState(true);

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    // const dispatch = useDispatch()
    const [signUp, { isLoading }] = useRegisterMutation()
    const submitUser = async (data) => {
        try {
            const result = await signUp(data).unwrap()

            // dispatch(setCredentials(result))

            navigate("/login")
        } catch (error) {
            console.log(error)
            toast.error(error?.data?.message || error.message)

        }
    }

    // console.log(user);

    // useEffect(() => {
    //     user && navigate('/login');
    // }, []);


    return (
        <section className='w-full min-h-screen flex item-center justify-center flex-col lg:flex-row bg-white'>
            <section className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center'>
                <section className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
                    <section className='w-full md:max--lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-1- 2xl:-mt-20'>
                        <span className='flex gap-1 px-3 border rounded-full text-sm md:text-base border-grey-300 text-grey-300'>
                            Get it done, done.
                        </span>
                        <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-400'>
                            <span>Greatness starts by</span>
                            <span>getting IT DONE</span>
                        </p>
                    </section>
                </section>
                <section className='w-full md:w-1/3 p-4 md:p-1 flex-col justify-center items-center'>
                    <form onSubmit={handleSubmit(submitUser)} className='form-container w-full md:w-[400px] flex flex-col gap-y-0 bg-white px-1 pt-14 pb-14'>
                        <section className=''>
                            <p className='text-blue text-3xl font-bold text-center'>Welcome, to getting it Done!</p>
                            <p className='text-center text-base text-gray-700'>Keep all your credentials safe.</p>
                        </section>
                        <section className='flex flex-col gap-y-5'>
                            <Textbox
                                type='text'
                                placeholder='Larry Stylinson'
                                name='name'
                                label='Full Name'
                                className=' w-full rounded-xl'
                                {...register('name',)}
                                error={errors.name ? errors.name.message : ""}
                            />
                            <Textbox
                                type='email'
                                placeholder='email@example.com'
                                name='email'
                                label='Email Address'
                                className=' w-full rounded-xl'
                                {...register('email',)}
                                error={errors.email ? errors.email.message : ""}
                            />

                            <Textbox
                                type='password'
                                placeholder='your password'
                                name='password'
                                label='Passwords'
                                className=' w-full rounded-xl'
                                {...register('password',)}
                                error={errors.password ? errors.password.message : ""}
                            />

                            <Field>
                                <Label>Are you the admin?</Label>
                                <Description>Admins have access to all features</Description>
                                <Checkbox
                                    checked={checked}
                                    onChange={setChecked}
                                >
                                    
                                </Checkbox>
                            </Field>
                            
                            <span className='text-sm text-gray-500 hover-text-blue-600 hover:underline cursor=pointer'>Already have an account? Log In</span>

                            {isLoading ? (
                                <Loading />
                            ) : (
                                <Button
                                    type="submit"
                                    label="Submit"
                                    className="w-full h-10 bg-blue-700 text-white rounded-md"
                                />
                            )}
                        </section>
                    </form>
                </section>
            </section>
        </section>
    );
};

export default Login;