import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { AlignJustify, Plus, Trash2 } from "lucide-react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import type { HasilSekolahFormValues } from "../model";
import { InputCommon } from "@/components/common/basic-input";
import { CSS as DndCSS } from "@dnd-kit/utilities";

export function FormItems({
	form,
	isLoading,
	label,
}: {
	form: UseFormReturn<HasilSekolahFormValues>;
	isLoading: boolean;
	label: string;
}) {
	const { control } = form;
	const { fields, append, remove, move } = useFieldArray({
		control,
		name: "items" as never,
	});

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;

		const oldIndex = fields.findIndex((f) => f.id === active.id);
		const newIndex = fields.findIndex((f) => f.id === over.id);

		move(oldIndex, newIndex);
	};

	return (
		<div className="flex flex-col gap-4 rounded-md border p-4">
			<p className="text-[#161646]">Daftar {label}</p>

			<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
				<SortableContext
					items={fields.map((f) => f.id)}
					strategy={verticalListSortingStrategy}
				>
					<div className="flex flex-col gap-2">
						{fields.map((field, index) => (
							<SortableItem
								key={field.id}
								id={field.id}
								index={index}
								form={form}
								isLoading={isLoading}
								onRemove={() => remove(index)}
								label={label}
							/>
						))}
					</div>
				</SortableContext>
			</DndContext>

			<button
				type="button"
				disabled={isLoading}
				className="flex py-1 gap-2 hover:bg-[#276CCD] hover:text-white transition-colors items-center justify-center rounded-md border border-[#276CCD] text-[#276CCD]"
				onClick={() => append("")}
			>
				<Plus size={16} />
				Tambah
			</button>
		</div>
	);
}

function SortableItem({
	id,
	index,
	form,
	isLoading,
	onRemove,
	label,
}: {
	id: string;
	index: number;
	form: UseFormReturn<HasilSekolahFormValues>;
	isLoading: boolean;
	onRemove: () => void;
	label: string;
}) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	const style = {
		transform: DndCSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className="flex flex-row gap-2 w-full items-center"
		>
			<button
				type="button"
				disabled={isLoading}
				{...attributes}
				{...listeners}
				className="flex h-7 w-7 cursor-grab items-center justify-center rounded-md bg-[#F5F9FF] text-[#276CCD]"
			>
				<AlignJustify size={16} />
			</button>

			<div className="flex items-center justify-center h-7 w-7">
				<p className="font-medium text-[#276CCD]">{index + 1}.</p>
			</div>

			<InputCommon
				name={`items.${index}`}
				form={form}
				placeholder={`Tulis ${label?.toLowerCase()} di sini...`}
				type="text"
				disabled={isLoading}
				className="flex-1"
			/>

			<button
				type="button"
				disabled={isLoading}
				className="flex h-7 w-7 items-center justify-center rounded-md bg-rose-500 text-white"
				onClick={onRemove}
			>
				<Trash2 size={16} />
			</button>
		</div>
	);
}
