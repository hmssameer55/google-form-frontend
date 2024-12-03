'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from './Header'
import FormCodeInput from './FormCodeInput'
import QuestionForm from './QuestionForm'

export default function SurveyForm() {
    const [formData, setFormData] = useState<any>(null)
    const [submitterEmail, setSubmitterEmail] = useState('')
    const router = useRouter()


    const handleFormSubmit = async (answers: any[]) => {
        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ submitter_email: submitterEmail, answers }),
            })
            if (!response.ok) throw new Error('Failed to submit form')
            alert('Form submitted successfully!')
            router.push('/')
        } catch (error) {
            console.error('Error submitting form:', error)
            alert('Failed to submit form. Please try again.')
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Header title={formData?.title || 'Survey Form'} />
            {!formData ? (
                <FormCodeInput />
            ) : (
                <QuestionForm
                    questions={formData.questions}
                    backgroundColor={formData.background_color}
                    onSubmit={handleFormSubmit}
                    submitterEmail={submitterEmail}
                    setSubmitterEmail={setSubmitterEmail}
                />
            )}
        </div>
    )
}

