import React, { useState } from "react";
import { InputNumber } from "antd";

const FloatInputNumber = (props) => {
	const {
		value,
		onChange,
		label,
		placeholder,
		type,
		required,
		disabled,
		readOnly,
		addonAfter,
		autoFocus,
		maxLength,
		inputMode,
		pattern,
		className,
		size,
		hideHandlerWrapper,
	} = props;

	const [focus, setFocus] = useState(false);

	let new_placeholder = placeholder ? placeholder : label;

	let isOccupied =
		focus ||
		(value !== undefined &&
			value !== null &&
			value !== "" &&
			value.length !== 0);

	let labelClass = isOccupied ? "label float-label" : "label";

	let requiredMark = required ? <span className="text-danger">*</span> : null;

	return (
		<div
			className={`float-wrapper float-input-number ${className ?? ""}`}
			onBlur={() => setFocus(false)}
			onFocus={() => setFocus(true)}
		>
			<InputNumber
				value={value}
				onChange={onChange}
				type={type}
				size={size ?? ""}
				autoComplete="off"
				disabled={disabled}
				readOnly={readOnly}
				addonAfter={addonAfter ? addonAfter : ""}
				autoFocus={autoFocus ? true : false}
				maxLength={maxLength}
				inputMode={inputMode}
				pattern={pattern}
				className={!hideHandlerWrapper ? "hide-input-handler-wrapper" : ""}
				step={props.step}
			/>
			<label className={labelClass}>
				{isOccupied ? label : new_placeholder} {requiredMark}
			</label>
		</div>
	);
};

export default FloatInputNumber;
