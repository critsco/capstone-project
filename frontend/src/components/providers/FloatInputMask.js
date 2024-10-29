import React, { useState } from "react";
import InputMask from "react-input-mask";

const FloatInputMask = (props) => {
	const {
		id,
		value,
		onChange,
		label,
		placeholder,
		required,
		maskType,
		onBlur,
		className,
		size,
		disabled,
		// maskPlaceholder,
	} = props;

	const [focus, setFocus] = useState(false);

	let new_placeholder = !placeholder ? label : placeholder;

	let isOccupied = focus || (value && value.length !== 0);

	let labelClass = isOccupied ? "label float-label" : "label";

	let requiredMark = required ? <span className="text-danger">*</span> : null;

	return (
		<div
			className={`float-wrapper float-input-mask ${className ?? ""}`}
			onBlur={() => setFocus(false)}
			onFocus={() => setFocus(true)}
		>
			<InputMask
				id={id ?? ""}
				alwaysShowMask={false}
				onChange={onChange}
				// maskPlaceholder={maskPlaceholder ? maskPlaceholder : null}
				mask={maskType ? maskType : "9999 9999 9999 9999"}
				value={value ? value : ""}
				onBlur={(e) => {
					if (onBlur) {
						onBlur(e);
					}
				}}
				className={`ant-input ${size ?? ""}`}
				disabled={disabled ?? false}
			/>
			<label className={labelClass}>
				{isOccupied ? label : new_placeholder} {requiredMark}
			</label>
		</div>
	);
};

export default FloatInputMask;
