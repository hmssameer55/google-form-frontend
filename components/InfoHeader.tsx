"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"


type Props = {
    title: string
    value: string
    onChange: (value: string) => void
}


export default function InfoHeader({ value, onChange, title }: Props) {
    return (
        <Card>
            <CardHeader className="border-b">
                <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
            </CardHeader>
            <CardContent className="p-5 space-y-2.5">
                <p className="font-semibold text-gray-500 text-base md:text-lg">Your Email</p>
                <p className="font-medium text-base text-slate-800">
                    Please enter your email to submit the survey.
                </p>
                <Input
                    type="email"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Your email"
                    required
                    className="h-11 !text-lg"
                />
            </CardContent>
            <CardContent className="text-red-500 font-medium border-t p-4">
                * Indicates required question
            </CardContent>
        </Card>
    )
}

