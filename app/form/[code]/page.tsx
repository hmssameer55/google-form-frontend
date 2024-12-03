import React from 'react'
import QuestionForm from '@/components/QuestionForm'
import type { FormRes } from '@/types'

type Props = {
    params: { code: string }
}

export default async function Form({ params }: Props) {

    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL

    const { code } = await params


    const res = await fetch(`${backendURL}/quiz/forms/${code}/`)
    const data: FormRes = await res.json()



    return (
        <QuestionForm
            code={code}
            title={data.title}
            questions={data.questions}
        />
    )
}