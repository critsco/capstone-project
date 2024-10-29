import React, { useState } from "react";
import { Input } from "antd";

const FloatTextArea = (props) => {
	const {
		value,
		onChange,
		label,
		placeholder,
		type,
		required,
		id,
		rows,
		onBlur,
		className,
		size,
	} = props;

	const [focus, setFocus] = useState(false);

	let new_placeholder = placeholder ? placeholder : label;

	let isOccupied = focus || (value && value.length !== 0);

	let labelClass = isOccupied ? "label float-label" : "label";

	let requiredMark = required ? <span className="text-danger">*</span> : null;

	return (
		<div
			className={`float-wrapper float-textarea ${className ?? ""}`}
			onBlur={() => setFocus(false)}
			onFocus={() => setFocus(true)}
		>
			<Input.TextArea
				id={id ?? ""}
				value={value}
				onChange={onChange}
				type={type}
				size={size ?? "middle"}
				rows={rows ?? 4}
				onBlur={(e) => {
					if (onBlur) {
						onBlur(e);
					}
				}}
			/>

			<label className={labelClass}>
				{isOccupied ? label : new_placeholder} {requiredMark}
			</label>
		</div>
	);
};

export default FloatTextArea;
