"use client"

import React from 'react'
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Question } from '@/types'

type Props = {
    index: number
    question: Question
    answer: any
    onChange: (questionId: number, value: any) => void
}

export default function QuestionCard({ index,
    question,
    answer,
    onChange, }: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-semibold capitalize">
                    {index + 1}{"."}  {question.question} {question.required && <span className="text-red-500">*</span>}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {question.question_type === "multi choice" ? (
                    <div className="space-y-3">
                        {question.choices.map((choice) => (
                            <div key={choice.id} className="flex items-center gap-3">
                                <Checkbox
                                    id={`choice-${choice.id}`}
                                    checked={answer.selected_choices.includes(choice.id)}
                                    onCheckedChange={(val) =>
                                        onChange(
                                            question.id,
                                            val
                                                ? [...answer.selected_choices, choice.id]
                                                : answer.selected_choices.filter((id: number) => id !== choice.id)
                                        )
                                    }
                                />
                                <Label htmlFor={`choice-${choice.id}`}>{choice.choice}</Label>
                            </div>
                        ))}
                    </div>
                ) : question.question_type === "single choice" ? (
                    <RadioGroup
                        value={String(answer?.selected_choice)}
                        onValueChange={(value) => onChange(question.id, Number(value))}
                        className="space-y-2"
                    >
                        {question.choices.map((choice) => (
                            <div key={choice.id} className="flex items-center gap-3">
                                <RadioGroupItem id={`choice-${choice.id}`} value={String(choice.id)} className="text-purple-800 border-slate-500" />
                                <Label htmlFor={`choice-${choice.id}`}>{choice.choice}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                ) : question.question_type == 'long answer' ? (
                    <Textarea
                        value={answer.text_answer}
                        onChange={(e) => onChange(question.id, e.target.value)}
                        required={question.required}
                        placeholder="Enter your answer here"
                        className="w-full"
                        rows={4}
                    />
                ) : <Input
                    value={answer.text_answer}
                    onChange={(e) => onChange(question.id, e.target.value)}
                    required={question.required}
                    placeholder="Enter your answer here"
                    className="w-full h-12"

                />
                }
            </CardContent>
        </Card>
    )
}


