import { Input } from "antd";
import { useState } from "react";

export default function FloatInput(props) {
	const {
		label,
		placeholder,
		onChange,
		onBlur,
		value,
		id,
		className,
		required,
		readOnly,
		disabled,
		type,
		step,
		prefix,
		addonAfter,
		addonBefore,
		allowClear,
		showCount,
		maxLength,
		size,
	} = props;

	const [focus, setFocus] = useState(false);

	let new_placeholder = !placeholder ? label : placeholder;

	let isOccupied = focus || (value && value !== "" && value.length !== 0);

	let labelClass =
		isOccupied || (value && value === "0" && value.length !== 0)
			? "label float-label"
			: "label";

	let requiredMark = required ? <span className="text-danger">*</span> : null;

	return (
		<div
			className={`float-wrapper ${className ? className : ""}`}
			onBlur={() => setFocus(false)}
			onFocus={() => setFocus(true)}
		>
			<Input
				id={id ?? ""}
				value={value}
				onChange={onChange}
				prefix={prefix}
				type={type}
				size={size ?? "middle"}
				autoComplete="off"
				disabled={disabled ?? false}
				readOnly={readOnly}
				addonAfter={addonAfter ?? ""}
				addonBefore={addonBefore ?? ""}
				allowClear={allowClear ? allowClear : false}
				maxLength={maxLength}
				showCount={showCount ?? false}
				onBlur={(e) => {
					if (onBlur) {
						onBlur(e);
					}
				}}
				step={step ?? ""}
			/>
			<label className={labelClass}>
				{isOccupied ? label : new_placeholder} {requiredMark}
			</label>
		</div>
	);
}
