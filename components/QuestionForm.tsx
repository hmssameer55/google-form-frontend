"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import type { Question } from "@/types"
import InfoHeader from "./InfoHeader"
import QuestionCard from "./QuestionCard"

interface QuestionFormProps {
    code: string
    title: string
    questions: Question[]
}


export default function QuestionForm({ code, questions, title }: QuestionFormProps) {
    const { toast } = useToast()
    const router = useRouter()

    const [submitterEmail, setSubmitterEmail] = useState("")

    const [answers, setAnswers] = useState(
        questions.map((q) => ({ question: q.id, selected_choices: [], text_answer: "", selected_choice: null }))
    )

    console.table(answers);


    const handleInputChange = (questionId: number, value: any) => {
        setAnswers((prev) =>
            prev.map((ans) => (ans.question === questionId ? { ...ans, ...value } : ans))
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL

        try {
            const response = await fetch(`${backendURL}/quiz/form-response/${code}/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ submitter_email: submitterEmail, answers }),
            })
            if (!response.ok) throw new Error("Failed to submit form")
            toast({ title: "Success", description: "Your Response has been captured Successfully" })
            setTimeout(() => router.push("/"), 2000)
        } catch (error) {
            console.error("Error submitting form:", error)
            toast({
                title: "Error",
                description: "Failed to submit form. Please try again.",
                variant: "destructive",
            })
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-screen-md w-full space-y-4">
            <InfoHeader
                title={title}
                value={submitterEmail}
                onChange={setSubmitterEmail}

            />
            {questions.map((q, index) => (
                <QuestionCard
                    key={q.id}
                    index={index}
                    question={q}
                    answer={answers.find((a) => a.question === q.id)!}
                    onChange={(id, value) =>
                        handleInputChange(id, {
                            ...(q.question_type === "multi choice" && { selected_choices: value }),
                            ...(q.question_type === "single choice" && { selected_choice: value }),
                            ...(q.question_type === "short answer" && { text_answer: value }),
                            ...(q.question_type === "long answer" && { text_answer: value }),
                        })
                    }
                />
            ))}
            <Button type="submit" className="h-10 text-lg" variant={"default"}>
                Submit
            </Button>
        </form>
    )
}
