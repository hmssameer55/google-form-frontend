import { ClipboardList } from 'lucide-react'

interface HeaderProps {
    title: string
}

export default function Header({ title }: HeaderProps) {
    return (
        <header className="flex items-center justify-center mb-8">
            <ClipboardList className="w-8 h-8 mr-2" />
            <h1 className="text-2xl font-bold capitalize">{title}</h1>
        </header>
    )
}

