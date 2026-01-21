import {
	FaBold,
	FaItalic,
	FaUnderline,
	FaStrikethrough,
	FaCode,
	FaListUl,
	FaListOl,
	FaQuoteRight,
	FaLink,
	FaUndo,
	FaRedo,
	FaPlus,
	FaMinus,
	FaHeading,
	FaEraser,
} from "react-icons/fa";
import { Editor } from "@tiptap/react";
import clsx from "clsx";

interface Props {
	editor: Editor;
	onLinkClick: () => void;
}

/* ================= UTIL ================= */
function getCurrentFontSize(editor: Editor) {
	const attrs = editor.getAttributes("textStyle");
	const size = attrs?.fontSize;
	return size ? parseInt(size.replace("px", ""), 10) : 16;
}

/* ================= UI ================= */
export function EditorToolbar({ editor, onLinkClick }: Props) {
	if (!editor) return null;

	const currentFontSize = getCurrentFontSize(editor);

	const Button = ({
		onClick,
		active,
		disabled,
		children,
		title,
	}: {
		onClick: () => void;
		active?: boolean;
		disabled?: boolean;
		children: React.ReactNode;
		title?: string;
	}) => (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			title={title}
			className={clsx(
				"flex h-9 w-9 items-center justify-center rounded-md border text-sm transition",
				active
					? "bg-blue-600 text-white border-blue-600"
					: "bg-white text-gray-700 hover:bg-gray-100",
				disabled && "opacity-40 cursor-not-allowed",
			)}
		>
			{children}
		</button>
	);

	const Separator = () => (
		<div className="mx-2 hidden h-6 w-px bg-gray-300 md:block" />
	);

	return (
		<div className="flex flex-wrap items-center gap-1 border-b bg-gray-50 px-2 py-2">
			{/* ========== HISTORY ========== */}
			<Button
				onClick={() => editor.chain().focus().undo().run()}
				disabled={!editor.can().undo()}
				title="Undo"
			>
				<FaUndo />
			</Button>
			<Button
				onClick={() => editor.chain().focus().redo().run()}
				disabled={!editor.can().redo()}
				title="Redo"
			>
				<FaRedo />
			</Button>

			<Separator />

			{/* ========== FONT SIZE ========== */}
			<Button
				onClick={() =>
					editor
						.chain()
						.focus()
						.setFontSize(`${Math.max(currentFontSize - 2, 8)}px`)
						.run()
				}
				title="Decrease font size"
			>
				<FaMinus />
			</Button>

			<input
				type="number"
				min={8}
				max={96}
				value={currentFontSize}
				onChange={(e) =>
					editor.chain().focus().setFontSize(`${e.target.value}px`).run()
				}
				className="h-9 w-16 rounded-md border text-center text-xs focus:outline-none"
			/>

			<Button
				onClick={() =>
					editor
						.chain()
						.focus()
						.setFontSize(`${Math.min(currentFontSize + 2, 96)}px`)
						.run()
				}
				title="Increase font size"
			>
				<FaPlus />
			</Button>

			<Separator />

			{/* ========== COLOR ========== */}
			<input
				type="color"
				value={editor.getAttributes("textStyle")?.color || "#000000"}
				onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
				title="Text color"
				className="h-9 w-9 cursor-pointer rounded-md border p-1"
			/>

			<Button
				onClick={() => editor.chain().focus().unsetColor().run()}
				title="Reset color"
			>
				<FaEraser />
			</Button>

			<Separator />

			{/* ========== HEADING ========== */}
			<Button
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				active={editor.isActive("heading", { level: 1 })}
				title="Heading 1"
			>
				<FaHeading />1
			</Button>

			<Button
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				active={editor.isActive("heading", { level: 2 })}
				title="Heading 2"
			>
				<FaHeading />2
			</Button>

			<Button
				onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				active={editor.isActive("heading", { level: 3 })}
				title="Heading 3"
			>
				<FaHeading />3
			</Button>

			<Separator />

			{/* ========== TEXT FORMAT ========== */}
			<Button
				onClick={() => editor.chain().focus().toggleBold().run()}
				active={editor.isActive("bold")}
				title="Bold"
			>
				<FaBold />
			</Button>

			<Button
				onClick={() => editor.chain().focus().toggleItalic().run()}
				active={editor.isActive("italic")}
				title="Italic"
			>
				<FaItalic />
			</Button>

			<Button
				onClick={() => editor.chain().focus().toggleUnderline().run()}
				active={editor.isActive("underline")}
				title="Underline"
			>
				<FaUnderline />
			</Button>

			<Button
				onClick={() => editor.chain().focus().toggleStrike().run()}
				active={editor.isActive("strike")}
				title="Strikethrough"
			>
				<FaStrikethrough />
			</Button>

			<Button
				onClick={() => editor.chain().focus().toggleCode().run()}
				active={editor.isActive("code")}
				title="Inline code"
			>
				<FaCode />
			</Button>

			<Separator />

			{/* ========== LIST & BLOCK ========== */}
			<Button
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				active={editor.isActive("bulletList")}
				title="Bullet list"
			>
				<FaListUl />
			</Button>

			<Button
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				active={editor.isActive("orderedList")}
				title="Ordered list"
			>
				<FaListOl />
			</Button>

			<Button
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				active={editor.isActive("blockquote")}
				title="Blockquote"
			>
				<FaQuoteRight />
			</Button>

			<Separator />

			{/* ========== LINK & CLEAN ========== */}
			<Button
				onClick={onLinkClick}
				active={editor.isActive("link")}
				title="Insert link"
			>
				<FaLink />
			</Button>

			<Button
				onClick={() =>
					editor.chain().focus().clearNodes().unsetAllMarks().run()
				}
				title="Clear formatting"
			>
				<FaEraser />
			</Button>
		</div>
	);
}
