import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


type LoginRequest ={
    email: string,
    password: string,
}

type LoginResponse = {
  accessToken: string;
  refreshToken?: string;
  user?: {
    uuid: string;
    email: string;
    username: string
  };
};



export type RegisterRequest={
    username: string,
    phoneNumber: string,
    address: {
        addressLine1: string,
        addressLine2: string,
        road: string,
        linkAddress: string,
      },
    email: string,
    password: string,
    confirmPassword: string,
    profile: string
}

export type RegisterResponse = {
  message: string;
  accessToken?: string;
  refreshToken?: string;
  user: {
    uuid: string;
    username: string;
    email: string;
    phoneNumber?: string;
    profile?: string;
    address?: {
      addressLine1: string;
      addressLine2?: string;
      road: string;
      linkAddress?: string;
    };
    createdAt?: string;
    updatedAt?: string;
  };
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_ISHOP_BASE_URL}`,
  }),
  endpoints: (builder) => ({
    loginUser :builder.mutation<LoginResponse, LoginRequest>({
        query: (credential) =>({
            url: "/auth/login",
            method: "POST",
            body: credential
        })
    }),

  registerUser: builder.mutation<RegisterResponse, RegisterRequest>({
        query: (credential)=>({
            url: "/users/user-signup",
            method: "POST",
            body: credential
        })
    })
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
