import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useEffect, useState, type ReactNode } from "react";
import type { UseFormReturn } from "react-hook-form";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";

import { cn } from "@/utils/cn";
import { EditorToolbar } from "./editor/EditorToolbar";
import { LinkModal } from "./editor/LinkModal";

import Color from "@tiptap/extension-color";
import { FontSize } from "./editor/FontSize";
import { TextStyle } from "@tiptap/extension-text-style";

export function TextEditorCommon({
	form,
	name,
	label,
	className,
	labelClassname,
	disabled,
	placeholder,
	minHeight = 240,
}: {
	form: UseFormReturn<any>;
	name: string;
	label?: ReactNode;
	className?: string;
	labelClassname?: string;
	disabled?: boolean;
	placeholder?: string;
	minHeight?: number;
}) {
	const [isLinkOpen, setIsLinkOpen] = useState(false);
	const [linkUrl, setLinkUrl] = useState("");

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => {
				const editor = useEditor({
					extensions: [
						StarterKit.configure({
							heading: { levels: [1, 2, 3] },
						}),
						TextStyle,
						Color,
						FontSize,
						Underline,
						Image.configure({ allowBase64: true }),
						Link.configure({ openOnClick: false }),
						Placeholder.configure({
							placeholder: placeholder || "Tulis konten...",
						}),
					],
					editable: !disabled,
					content: field.value || "",
					onUpdate({ editor }) {
						field.onChange(editor.getHTML());
					},
				});

				// 🔄 Sync value dari RHF → Editor
				useEffect(() => {
					if (!editor) return;

					const html = field.value || "";
					if (html !== editor.getHTML()) {
						editor.commands.setContent(html, { emitUpdate: false });
					}
				}, [editor, field.value]);

				const openModal = () => {
					if (!editor) return;
					setLinkUrl(editor.getAttributes("link")?.href || "");
					setIsLinkOpen(true);
				};

				const closeModal = () => {
					setIsLinkOpen(false);
					setLinkUrl("");
				};

				const saveLink = () => {
					if (!editor) return;

					if (linkUrl) {
						editor
							.chain()
							.focus()
							.extendMarkRange("link")
							.setLink({ href: linkUrl, target: "_blank" })
							.run();
					} else {
						editor.chain().focus().unsetLink().run();
					}

					closeModal();
				};

				const removeLink = () => {
					editor?.chain().focus().unsetLink().run();
					closeModal();
				};

				return (
					<FormItem className={className}>
						{label && <FormLabel className={labelClassname}>{label}</FormLabel>}

						<FormControl>
							<div className="rounded-md border">
								<EditorToolbar editor={editor} onLinkClick={openModal} />

								<EditorContent
									editor={editor}
									className={cn(
										"prose prose-sm max-w-none px-3 py-2 focus:outline-none",
										"min-h-[240px]",
									)}
									style={{ minHeight }}
								/>
							</div>
						</FormControl>

						<FormMessage />

						<LinkModal
							isOpen={isLinkOpen}
							url={linkUrl}
							onChangeUrl={(e) => setLinkUrl(e.target.value)}
							onSaveLink={saveLink}
							onRemoveLink={removeLink}
							closeModal={closeModal}
						/>
					</FormItem>
				);
			}}
		/>
	);
}
