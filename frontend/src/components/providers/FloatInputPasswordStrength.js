import React, { useState } from "react";
import { PasswordInput } from "antd-password-input-strength";

const FloatInputPasswordStrength = (props) => {
	const {
		id,
		value,
		onChange,
		label,
		placeholder,
		type,
		required,
		size,
		className,
		autoComplete,
	} = props;

	const [focus, setFocus] = useState(false);

	let new_placeholder = placeholder ? placeholder : label;

	let isOccupied = focus || (value && value.length !== 0);

	let labelClass = isOccupied ? "label float-label" : "label";

	let requiredMark = required ? <span className="text-danger">*</span> : null;

	return (
		<div
			className={`float-wrapper float-input-password-strength ${
				className ?? ""
			}`}
			onBlur={() => setFocus(false)}
			onFocus={() => setFocus(true)}
		>
			<PasswordInput
				id={id ?? ""}
				value={value}
				onChange={onChange}
				type={type}
				size={size ?? "middle"}
				autoComplete={autoComplete ?? "off"}
			/>
			<label className={labelClass}>
				{isOccupied ? label : new_placeholder} {requiredMark}
			</label>
		</div>
	);
};

export default FloatInputPasswordStrength;
