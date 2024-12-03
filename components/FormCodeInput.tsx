"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { KeyRound } from 'lucide-react'

export default function FormCodeInput() {
    const { toast } = useToast()
    const router = useRouter()
    const [code, setCode] = useState('')
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch(`${backendURL}/quiz/forms/${code}/`)

            if (!res.ok) {
                throw new Error(res.statusText)
            }

            router.push('/form/' + code)
        } catch (err) {
            toast({
                variant: 'destructive',
                description: 'Invalid Form code'
            })
        }
    }

    return (

        <Card className="w-full max-w-screen-sm bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader className="space-y-2 flex items-center text-center">
                <div className="size-16 bg-black rounded-full flex items-center justify-center mb-4">
                    <KeyRound className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-semibold">Enter Form Code</CardTitle>
                <CardDescription>
                    Please enter your form code to proceed
                </CardDescription>
            </CardHeader>
            <CardContent className="w-full px-8 pb-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <Input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter form code"
                        required
                        className="h-16 !text-2xl text-center tracking-wider placeholder:text-gray-400"
                    />
                    <Button
                        type="submit"
                        className="w-full h-14 text-lg bg-black hover:bg-gray-800 transition-colors"
                    >
                        Proceed
                    </Button>
                </form>
            </CardContent>
        </Card>

    )
}

