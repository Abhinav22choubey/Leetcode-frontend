import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  emailId: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Minimum 8 characters")
    .regex(/[A-Z]/, "Must contain one uppercase letter")
    .regex(/[a-z]/, "Must contain one lowercase letter")
    .regex(/[0-9]/, "Must contain one number")
    .regex(/[^A-Za-z0-9]/, "Must contain one special character"),
});

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const submittedForm = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4">
      
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8">

        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit(submittedForm)} className="space-y-5">

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              {...register("emailId")}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.emailId && (
              <p className="text-red-400 text-sm mt-1">
                {errors.emailId.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-semibold text-white"
          >
            Login
          </button>

        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Don't have an account?{" "}
          <span className="text-indigo-400 cursor-pointer hover:underline">
            Sign up
          </span>
        </p>

      </div>
    </div>
  );
};

export default SignUp;