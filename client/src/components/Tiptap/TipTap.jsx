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
          onClick={() => editor.chain().focus().setParagraph().run()} 
          className={`button ${editor.isActive('paragraph') ? 'is-active' : ''}`}
        >
          Paragraph
        </button>
        <button 
          onClick={() => editor.chain().focus().toggleBold().run()} 
          className={`button ${editor.isActive('bold') ? 'is-active' : ''}`}
        >
          Bold
        </button>
        <button 
          onClick={() => editor.chain().focus().toggleItalic().run()} 
          className={`button ${editor.isActive('italic') ? 'is-active' : ''}`}
        >
          Italic
        </button>
        <button 
          onClick={() => editor.chain().focus().toggleStrike().run()} 
          className={`button ${editor.isActive('strike') ? 'is-active' : ''}`}
        >
          Strike
        </button>
        <button 
          onClick={() => editor.chain().focus().toggleHighlight().run()} 
          className={`button ${editor.isActive('highlight') ? 'is-active' : ''}`}
        >
          Highlight
        </button>
        <button 
          onClick={() => editor.chain().focus().setTextAlign('left').run()} 
          className={`button ${editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}`}
        >
          Left
        </button>
        <button 
          onClick={() => editor.chain().focus().setTextAlign('center').run()} 
          className={`button ${editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}`}
        >
          Center
        </button>
        <button 
          onClick={() => editor.chain().focus().setTextAlign('right').run()} 
          className={`button ${editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}`}
        >
          Right
        </button>
        <button 
          onClick={() => editor.chain().focus().setTextAlign('justify').run()} 
          className={`button ${editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}`}
        >
          Justify
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
        content: '<p>Hello World! 🌍</p>',
    })

    return (
        <div className="tiptap">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}

export default TiptapEditor
