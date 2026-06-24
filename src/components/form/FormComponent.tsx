import React from 'react'
import {useForm} from "react-hook-form"

// create type
type formData = {
    email: string ,
    password :  string 
}

export default function FormComponent() {

// 1. declare object using with useForm
const {
    register ,
    handleSubmit,
    reset,
    setError
} = useForm({
    // 2. set default values
    defaultValues:{
        email: "",
        password: ""
    }
});



// 3. create handleSubmit to track value from input form
const onSubmit = (data:formData) => (
    console.log("====> form data email : " , data?.email),
    console.log("====> from data password : " , data?.password)
)



  return (
    <div>

    <form onSubmit={handleSubmit(onSubmit)}>
        {/* input email */}
        <label htmlFor="email"></label>
        <input type="text" />

        {/* input password */}
        <label htmlFor="password"></label>
        <input type="text" />

    <button>Submit</button>

    </form>

    </div>
  )
}
