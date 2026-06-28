"use client";
import { useRegisterUserMutation } from "@/services/AuthApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormType, registerSchema } from "@/lib/zod/registerSchema";

export default function SignUpComponent() {
  const [signUpUser, { isLoading }] = useRegisterUserMutation();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      profile: "",
      address: {
        addressLine1: "",
        addressLine2: "",
        road: "",
        linkAddress: "",
      },
    },
  });

  const onSubmit = async (data: RegisterFormType) => {
    try {
      await signUpUser(data).unwrap();
      reset();
    } catch (error) {
      setError("email", {
        message: error?.data?.message || "Register failed",
      });
    }
  };
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl space-y-8 rounded-2xl bg-white p-8 shadow-xl border border-gray-100">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-1.5">
                    <input
                      {...register("username")}
                      type="text"
                      id="username"
                      placeholder="johndoe"
                      className="block w-full rounded-lg border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 transition"
                    />
                    {errors.username && (
                      <p className="mt-1.5 text-xs text-red-600">
                        {errors.username.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone Number
                  </label>
                  <div className="mt-1.5">
                    <input
                      {...register("phoneNumber")}
                      type="text"
                      id="phoneNumber"
                      placeholder="+855 000-0000"
                      className="block w-full rounded-lg border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 transition"
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1.5 text-xs text-red-600">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-1.5">
                  <input
                    {...register("email")}
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                    className="block w-full rounded-lg border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 transition"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-1.5">
                    <input
                      {...register("password")}
                      type="password"
                      id="password"
                      placeholder="******"
                      className="block w-full rounded-lg border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 transition"
                    />
                    {errors.password && (
                      <p className="mt-1.5 text-xs text-red-600">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1.5">
                    <input
                      {...register("confirmPassword")}
                      type="password"
                      id="confirmPassword"
                      placeholder="********"
                      className="block w-full rounded-lg border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 transition"
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1.5 text-xs text-red-600">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="profile"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Profile Image URL
                </label>
                <div className="mt-1.5">
                  <input
                    {...register("profile")}
                    type="text"
                    id="profile"
                    placeholder="https://example.com/avatar.jpg"
                    className="block w-full rounded-lg border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 transition"
                  />
                  {errors.profile && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {errors.profile.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="relative py-2">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-start text-xs font-medium uppercase tracking-wider">
                  <span className="bg-white pr-3 text-gray-500">
                    Address Details
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="addressLine1"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Address Line 1
                  </label>
                  <div className="mt-1.5">
                    <input
                      {...register("address.addressLine1")}
                      type="text"
                      id="addressLine1"
                      placeholder="Apartment, suite, unit, etc."
                      className="block w-full rounded-lg border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 transition"
                    />
                    {errors.address?.addressLine1 && (
                      <p className="mt-1.5 text-xs text-red-600">
                        {errors.address.addressLine1.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="addressLine2"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Address Line 2
                  </label>
                  <div className="mt-1.5">
                    <input
                      {...register("address.addressLine2")}
                      type="text"
                      id="addressLine2"
                      placeholder="Street address, P.O. box"
                      className="block w-full rounded-lg border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 transition"
                    />
                    {errors.address?.addressLine2 && (
                      <p className="mt-1.5 text-xs text-red-600">
                        {errors.address.addressLine2.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="road"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Road
                  </label>
                  <div className="mt-1.5">
                    <input
                      {...register("address.road")}
                      type="text"
                      id="road"
                      placeholder="Main St / Broadway"
                      className="block w-full rounded-lg border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 transition"
                    />
                    {errors.address?.road && (
                      <p className="mt-1.5 text-xs text-red-600">
                        {errors.address.road.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="linkAddress"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Google Map Link
                  </label>
                  <div className="mt-1.5">
                    <input
                      {...register("address.linkAddress")}
                      type="url"
                      id="linkAddress"
                      placeholder="https://maps.google.com/..."
                      className="block w-full rounded-lg border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 transition"
                    />
                    {errors.address?.linkAddress && (
                      <p className="mt-1.5 text-xs text-red-600">
                        {errors.address.linkAddress.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-lg bg-indigo-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
