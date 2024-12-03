export interface FormRes {
    id: number
    code: string
    title: string
    background_color: string
    questions: Question[]
}

export interface Question {
    id: number
    question: string
    choices: { id: number; choice: string }[]
    required: boolean
    question_type: 'short answer' | 'long answer' | 'multi choice' | 'single choice'
}
