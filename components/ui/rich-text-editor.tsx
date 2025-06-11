"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
    Bold,
    Italic,
    AlignLeft,
    AlignCenter,
    AlignRight,
    List,
    ListOrdered,
    Link,
    Code,
    Undo,
    Redo,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface RichTextEditorProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
    minHeight?: string
}

export function RichTextEditor({
    value,
    onChange,
    placeholder = "Usa la barra de herramientas para formatear tu texto con negrita, cursiva, enlaces, listas y más.",
    className,
    minHeight = "120px",
}: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null)
    const [isFocused, setIsFocused] = useState(false)

    const executeCommand = (command: string, value?: string) => {
        document.execCommand(command, false, value)
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML)
        }
    }

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML)
        }
    }

    const toolbarButtons = [
        { icon: Bold, command: "bold", title: "Negrita" },
        { icon: Italic, command: "italic", title: "Cursiva" },
        { icon: AlignLeft, command: "justifyLeft", title: "Alinear izquierda" },
        { icon: AlignCenter, command: "justifyCenter", title: "Centrar" },
        { icon: AlignRight, command: "justifyRight", title: "Alinear derecha" },
        { icon: List, command: "insertUnorderedList", title: "Lista con viñetas" },
        { icon: ListOrdered, command: "insertOrderedList", title: "Lista numerada" },
        { icon: Link, command: "createLink", title: "Insertar enlace", prompt: true },
        { icon: Code, command: "formatBlock", value: "pre", title: "Código" },
        { icon: Undo, command: "undo", title: "Deshacer" },
        { icon: Redo, command: "redo", title: "Rehacer" },
    ]

    const handleButtonClick = (button: (typeof toolbarButtons)[0]) => {
        if (button.prompt) {
            const url = prompt("Ingresa la URL del enlace:")
            if (url) {
                executeCommand(button.command, url)
            }
        } else {
            executeCommand(button.command, button.value)
        }
    }

    return (
        <div className={cn("border border-gray-300 rounded-lg overflow-hidden", className)}>
            {/* Toolbar */}
            <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50">
                {toolbarButtons.map((button, index) => (
                    <Button
                        key={index}
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-gray-200"
                        onClick={() => handleButtonClick(button)}
                        title={button.title}
                    >
                        <button.icon className="h-4 w-4" />
                    </Button>
                ))}
            </div>

            {/* Editor */}
            <div
                ref={editorRef}
                contentEditable
                className={cn("p-3 outline-none focus:ring-0", "prose prose-sm max-w-none", !value && "text-gray-500")}
                style={{ minHeight }}
                onInput={handleInput}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                dangerouslySetInnerHTML={{ __html: value || "" }}
                data-placeholder={placeholder}
            />

            {!value && (
                <div className="absolute inset-0 top-[52px] left-3 right-3 pointer-events-none text-gray-500 text-sm">
                    {placeholder}
                </div>
            )}
        </div>
    )
}
