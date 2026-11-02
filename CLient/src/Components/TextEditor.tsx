import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'

const TextEditor = () => {

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
    ],
    content: '<p>Start writing your blog...</p>',
  })

  if (!editor) return null

  return (
    <div className="border rounded-lg p-4">

      <div className="flex gap-3 mb-4">

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          Bullet List
        </button>

      </div>

      <EditorContent editor={editor} />

    </div>
  )
}

export default TextEditor