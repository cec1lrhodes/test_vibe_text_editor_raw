import { ToolbarButton } from "./ToolbarButton";
import type { Editor } from "@tiptap/react";
import { useEditorState } from "@tiptap/react";

interface EditorToolbarProps {
  editor: Editor | null;
  onImageInsert: () => void;
}

export const EditorToolbar = ({
  editor,
  onImageInsert,
}: EditorToolbarProps) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor?.isActive("bold") ?? false,
      isItalic: ctx.editor?.isActive("italic") ?? false,
      isUnderline: ctx.editor?.isActive("underline") ?? false,
      isStrike: ctx.editor?.isActive("strike") ?? false,
      isAlignLeft: ctx.editor?.isActive({ textAlign: "left" }) ?? false,
      isAlignCenter: ctx.editor?.isActive({ textAlign: "center" }) ?? false,
      isAlignRight: ctx.editor?.isActive({ textAlign: "right" }) ?? false,
      isH1: ctx.editor?.isActive("heading", { level: 1 }) ?? false,
      isH2: ctx.editor?.isActive("heading", { level: 2 }) ?? false,
    }),
  });

  if (!editor) return null;

  const e = editor as any;

  return (
    <div className="flex items-center gap-1 px-3 py-2 border-b border-zinc-700 flex-wrap">
      <ToolbarButton
        onClick={() => e.chain().focus().toggleBold().run()}
        isActive={editorState?.isBold}
        title="Bold"
      >
        <b>B</b>
      </ToolbarButton>

      <ToolbarButton
        onClick={() => e.chain().focus().toggleItalic().run()}
        isActive={editorState?.isItalic}
        title="Italic"
      >
        <i>I</i>
      </ToolbarButton>

      <ToolbarButton
        onClick={() => e.chain().focus().toggleUnderline().run()}
        isActive={editorState?.isUnderline}
        title="Underline"
      >
        <u>U</u>
      </ToolbarButton>

      <ToolbarButton
        onClick={() => e.chain().focus().toggleStrike().run()}
        isActive={editorState?.isStrike}
        title="Strikethrough"
      >
        <s>S</s>
      </ToolbarButton>

      <div className="w-px h-5 bg-zinc-700 mx-1" />

      <ToolbarButton
        onClick={() => e.chain().focus().setTextAlign("left").run()}
        isActive={editorState?.isAlignLeft}
        title="Align Left"
      >
        ≡
      </ToolbarButton>

      <ToolbarButton
        onClick={() => e.chain().focus().setTextAlign("center").run()}
        isActive={editorState?.isAlignCenter}
        title="Align Center"
      >
        ☰
      </ToolbarButton>

      <ToolbarButton
        onClick={() => e.chain().focus().setTextAlign("right").run()}
        isActive={editorState?.isAlignRight}
        title="Align Right"
      >
        ≣
      </ToolbarButton>

      <div className="w-px h-5 bg-zinc-700 mx-1" />

      <ToolbarButton
        onClick={() => e.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editorState?.isH1}
        title="Heading 1"
      >
        H1
      </ToolbarButton>

      <ToolbarButton
        onClick={() => e.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editorState?.isH2}
        title="Heading 2"
      >
        H2
      </ToolbarButton>

      <div className="w-px h-5 bg-zinc-700 mx-1" />

      <ToolbarButton onClick={onImageInsert} title="Insert Image">
        🖼
      </ToolbarButton>
    </div>
  );
};
