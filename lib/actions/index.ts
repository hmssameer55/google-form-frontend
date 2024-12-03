"use server"

import { redirect } from "next/navigation"

const backendURL = process.env.BACKEND_URL

export const ValidateForm = async (fd: FormData) => {

    const formcode = fd.get("formcode")

    try {
        const res = await fetch(`${backendURL}/quiz/forms/${formcode}`)
        redirect(`/form/${formcode}`)
    } catch (err) {
        console.log(err)
    }
}