import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import '../Tiptap/tiptap.scss'

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="control-group">
      <div className="button-group">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={`button ${editor.isActive('bold') ? 'is-active' : ''}`}
        >
          Bold
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={`button ${editor.isActive('italic') ? 'is-active' : ''}`}
        >
          Italic
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className={`button ${editor.isActive('strike') ? 'is-active' : ''}`}
        >
          Strike
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
          className={`button ${editor.isActive('code') ? 'is-active' : ''}`}
        >
          Code
        </button>

        <button
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          className="button"
        >
          Clear marks
        </button>

        <button
          onClick={() => editor.chain().focus().clearNodes().run()}
          className="button"
        >
          Clear nodes
        </button>

        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`button ${editor.isActive('paragraph') ? 'is-active' : ''}`}
        >
          Paragraph
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`button ${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}`}
        >
          H1
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`button ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
        >
          H2
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`button ${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}`}
        >
          H3
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={`button ${editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}`}
        >
          H4
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={`button ${editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}`}
        >
          H5
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={`button ${editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}`}
        >
          H6
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`button ${editor.isActive('bulletList') ? 'is-active' : ''}`}
        >
          Bullet list
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`button ${editor.isActive('orderedList') ? 'is-active' : ''}`}
        >
          Ordered list
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`button ${editor.isActive('codeBlock') ? 'is-active' : ''}`}
        >
          Code block
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`button ${editor.isActive('blockquote') ? 'is-active' : ''}`}
        >
          Blockquote
        </button>

        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="button"
        >
          Horizontal rule
        </button>

        <button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className="button"
        >
          Hard break
        </button>

        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
          className="button"
        >
          Undo
        </button>

        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
          className="button"
        >
          Redo
        </button>

        <button
          onClick={() => editor.chain().focus().setColor('#958DF1').run()}
          className={`button ${editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}`}
        >
          Purple
        </button>

      </div>
    </div>
  )
}

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TextAlign.configure({
        types: ['heading'],
      }),
    ],
    content: '<p>Escribe aqui tu texto...</p>',
  })

  return (
    <div className="tiptap">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default TiptapEditor
