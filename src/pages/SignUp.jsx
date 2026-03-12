import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form"

const SignUp = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const submittedForm=(data)=>{
        console.log(data);
    }
    return (
        <>
            <form onSubmit={handleSubmit(submittedForm)}>
                <input {...register("firstName")} />
                <input {...register("emailId")} />
                <input {...register("password")} />
                <button type='submit'>Submit</button>
            </form>
        </>
    );
}

export default SignUp;
