import React from 'react';
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
    firstName: z.string().min(3, "Name is too short"),
    emailId: z.string().email(),
    password: z
        .string()
        .min(8, "Minimum 8 characters")
        .regex(/[A-Z]/, "Must contain one uppercase letter")
        .regex(/[a-z]/, "Must contain one lowercase letter")
        .regex(/[0-9]/, "Must contain one number")
        .regex(/[^A-Za-z0-9]/, "Must contain one special character"),
})

const SignUp = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    })
    const submittedForm = (data) => {
        console.log(data);
    }
    return (
        <>
            <form onSubmit={handleSubmit(submittedForm)}>
                <input {...register("firstName")} />
                {errors.firstName && (<span>{errors.firstame.message}</span>)}
                <input type='email' {...register("emailId")} />
                {errors.emailId && (<span>{errors.emailId.message}</span>)}
                <input type='password' {...register("password")} />
                {errors.password && (<span>{errors.password.message}</span>)}
                <button type='submit'>Submit</button>
            </form>
        </>
    );
}

export default SignUp;
