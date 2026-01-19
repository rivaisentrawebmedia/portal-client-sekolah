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
} from "react-icons/fa";
import { Editor } from "@tiptap/react";
import clsx from "clsx";

interface Props {
	editor: Editor;
	onLinkClick: () => void;
}

export function EditorToolbar({ editor, onLinkClick }: Props) {
	if (!editor) return null;

	const Button = ({
		onClick,
		active,
		disabled,
		children,
	}: {
		onClick: () => void;
		active?: boolean;
		disabled?: boolean;
		children: React.ReactNode;
	}) => (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			className={clsx(
				"rounded p-2 text-sm transition",
				active
					? "bg-blue-600 text-white"
					: "bg-white text-gray-700 hover:bg-gray-100",
				disabled && "opacity-40 cursor-not-allowed"
			)}
		>
			{children}
		</button>
	);

	return (
		<div className="flex flex-wrap items-center gap-1 border-b bg-gray-50 p-2">
			<Button
				onClick={() => editor.chain().focus().undo().run()}
				disabled={!editor.can().undo()}
			>
				<FaUndo />
			</Button>
			<Button
				onClick={() => editor.chain().focus().redo().run()}
				disabled={!editor.can().redo()}
			>
				<FaRedo />
			</Button>

			<div className="mx-1 h-6 w-px bg-gray-300" />

			<Button
				onClick={() => editor.chain().focus().toggleBold().run()}
				active={editor.isActive("bold")}
			>
				<FaBold />
			</Button>

			<Button
				onClick={() => editor.chain().focus().toggleItalic().run()}
				active={editor.isActive("italic")}
			>
				<FaItalic />
			</Button>

			<Button
				onClick={() => editor.chain().focus().toggleUnderline().run()}
				active={editor.isActive("underline")}
			>
				<FaUnderline />
			</Button>

			<Button
				onClick={() => editor.chain().focus().toggleStrike().run()}
				active={editor.isActive("strike")}
			>
				<FaStrikethrough />
			</Button>

			<Button
				onClick={() => editor.chain().focus().toggleCode().run()}
				active={editor.isActive("code")}
			>
				<FaCode />
			</Button>

			<div className="mx-1 h-6 w-px bg-gray-300" />

			<Button
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				active={editor.isActive("bulletList")}
			>
				<FaListUl />
			</Button>

			<Button
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				active={editor.isActive("orderedList")}
			>
				<FaListOl />
			</Button>

			<Button
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				active={editor.isActive("blockquote")}
			>
				<FaQuoteRight />
			</Button>

			<div className="mx-1 h-6 w-px bg-gray-300" />

			<Button onClick={onLinkClick} active={editor.isActive("link")}>
				<FaLink />
			</Button>
		</div>
	);
}
