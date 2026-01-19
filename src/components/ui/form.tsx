import * as React from "react";
import type * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
	Controller,
	FormProvider,
	useFormContext,
	useFormState,
	type ControllerProps,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/cn";

const Form = FormProvider;

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
	name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
	{} as FormFieldContextValue
);

const FormField = <
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues>
>({
	...props
}: ControllerProps<TFieldValues, TName>) => (
	<FormFieldContext.Provider value={{ name: props.name }}>
		<Controller {...props} />
	</FormFieldContext.Provider>
);

const FormItemContext = React.createContext<{ id: string }>({ id: "" });

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
	const id = React.useId();
	return (
		<FormItemContext.Provider value={{ id }}>
			<div className={cn("grid gap-2", className)} {...props} />
		</FormItemContext.Provider>
	);
}

function useFormField() {
	const fieldContext = React.useContext(FormFieldContext);
	const itemContext = React.useContext(FormItemContext);
	const { getFieldState } = useFormContext();
	const formState = useFormState({ name: fieldContext.name });
	const fieldState = getFieldState(fieldContext.name, formState);

	return {
		id: itemContext.id,
		name: fieldContext.name,
		error: fieldState.error,
	};
}

function FormLabel({
	className,
	...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
	const { id, error } = useFormField();
	return (
		<Label
			htmlFor={id}
			className={cn(error && "text-red-500", className)}
			{...props}
		/>
	);
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
	const { id, error } = useFormField();
	return <Slot id={id} aria-invalid={!!error} {...props} />;
}

function FormMessage({ className }: { className?: string }) {
	const { error } = useFormField();
	if (!error) return null;
	return (
		<p className={cn("text-sm text-red-500", className)}>{error.message}</p>
	);
}

export { Form, FormField, FormItem, FormLabel, FormControl, FormMessage };
