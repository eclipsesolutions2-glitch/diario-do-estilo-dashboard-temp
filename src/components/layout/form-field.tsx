import {
	type Control,
	Controller,
	type ControllerRenderProps,
	type FieldValues,
	type Path,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

interface FormFieldProps<
	TFieldValues extends FieldValues,
	TName extends Path<TFieldValues>,
> {
	name: TName;
	label: string;
	control: Control<TFieldValues>;
	children: (
		field: ControllerRenderProps<TFieldValues, TName>,
	) => React.ReactNode;
	header?: React.ReactNode;
	required?: boolean;
}

export function FormField<
	TFieldValues extends FieldValues,
	TName extends Path<TFieldValues>,
>({
	name,
	label,
	control,
	children,
	header,
	required,
}: FormFieldProps<TFieldValues, TName>) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Field>
					<div className="flex items-center justify-between">
						<FieldLabel htmlFor={name}>
							{label}
							{required && (
								<span className="text-red-500">*</span>
							)}
						</FieldLabel>
						{header}
					</div>

					{children(field)}

					{fieldState.invalid && (
						<FieldError errors={[fieldState.error]} />
					)}
				</Field>
			)}
		/>
	);
}
