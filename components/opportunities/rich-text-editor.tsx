"use client"

import { useEditor, EditorContent, type Editor as EditorType } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Heading3,
    Quote,
    Undo,
    Redo,
    LinkIcon,
    ImageIcon,
    Code,
    Pilcrow,
    RemoveFormatting,
} from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface RichTextEditorProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
}

export function RichTextEditor({
    value,
    onChange,
    placeholder = "Write something...",
    className,
}: RichTextEditorProps) {
    const [linkUrl, setLinkUrl] = useState("")
    const [imageUrl, setImageUrl] = useState("")

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder,
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-primary underline",
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: "rounded-md max-w-full",
                },
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    if (!editor) {
        return null
    }

    const setLink = () => {
        if (linkUrl) {
            // Check if the URL has a protocol, if not add https://
            const url = linkUrl.match(/^https?:\/\//) ? linkUrl : `https://${linkUrl}`

            // If there is no selection, don't do anything
            if (editor.state.selection.empty) {
                editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
            } else {
                editor.chain().focus().setLink({ href: url }).run()
            }

            setLinkUrl("")
        } else {
            editor.chain().focus().unsetLink().run()
        }
    }

    const addImage = () => {
        if (imageUrl) {
            editor.chain().focus().setImage({ src: imageUrl }).run()
            setImageUrl("")
        }
    }

    return (
        <div className={`border rounded-md ${className}`}>
            <style jsx global>
                {editorStyles}
            </style>
            <div className="flex flex-wrap gap-1 border-b p-2 bg-background sticky top-0 z-10">
                <MenuBar editor={editor} />

                <Popover>
                    <PopoverTrigger asChild>
                        <Toggle size="sm" pressed={editor.isActive("link")} aria-label="Link">
                            <LinkIcon className="h-4 w-4" />
                        </Toggle>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-3">
                        <div className="flex flex-col gap-2">
                            <div className="text-sm font-medium">Insert Link</div>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="https://example.com"
                                    value={linkUrl}
                                    onChange={(e) => setLinkUrl(e.target.value)}
                                    className="flex-1"
                                />
                                <Button size="sm" onClick={setLink}>
                                    Add
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>

                <Popover>
                    <PopoverTrigger asChild>
                        <Toggle size="sm" aria-label="Image">
                            <ImageIcon className="h-4 w-4" />
                        </Toggle>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-3">
                        <div className="flex flex-col gap-2">
                            <div className="text-sm font-medium">Insert Image</div>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="https://example.com/image.jpg"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    className="flex-1"
                                />
                                <Button size="sm" onClick={addImage}>
                                    Add
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <div
                className="prose prose-sm dark:prose-invert max-w-none p-4 min-h-[350px] text-foreground bg-background focus-within:outline-none cursor-text"
                onClick={() => editor?.commands.focus()}
            >
                <EditorContent editor={editor} className="min-h-full" />
            </div>
        </div>
    )
}

// Estilos adicionales para eliminar el borde azul
const editorStyles = `
  .ProseMirror {
    outline: none !important;
    min-height: 300px;
    cursor: text;
    padding: 1rem;
  }
  
  .ProseMirror:focus {
    outline: none !important;
  }
  
  .ProseMirror p.is-editor-empty:first-child::before {
    color: #adb5bd;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }
  
  /* Hacer que todo el área sea clickeable */
  .ProseMirror {
    width: 100%;
    height: 100%;
  }
  
  /* Asegurar que el contenedor padre también sea clickeable */
  .prose {
    cursor: text;
  }
  
  .prose:empty::before {
    content: attr(data-placeholder);
    color: #9ca3af;
    pointer-events: none;
  }
`

interface MenuBarProps {
    editor: EditorType
}

function MenuBar({ editor }: MenuBarProps) {
    if (!editor) {
        return null
    }

    return (
        <>
            <Toggle
                size="sm"
                pressed={editor.isActive("bold")}
                onClick={() => editor.chain().focus().toggleBold().run()}
                aria-label="Bold"
            >
                <Bold className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive("italic")}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                aria-label="Italic"
            >
                <Italic className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive("heading", { level: 1 })}
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                aria-label="Heading 1"
            >
                <Heading1 className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive("heading", { level: 2 })}
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                aria-label="Heading 2"
            >
                <Heading2 className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive("heading", { level: 3 })}
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                aria-label="Heading 3"
            >
                <Heading3 className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive("bulletList")}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                aria-label="Bullet List"
            >
                <List className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive("orderedList")}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                aria-label="Ordered List"
            >
                <ListOrdered className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive("blockquote")}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                aria-label="Quote"
            >
                <Quote className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive("codeBlock")}
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                aria-label="Code Block"
            >
                <Code className="h-4 w-4" />
            </Toggle>

            <Toggle size="sm" onClick={() => editor.chain().focus().setParagraph().run()} aria-label="Paragraph">
                <Pilcrow className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                aria-label="Clear Formatting"
            >
                <RemoveFormatting className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                aria-label="Undo"
            >
                <Undo className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                aria-label="Redo"
            >
                <Redo className="h-4 w-4" />
            </Toggle>
        </>
    )
}