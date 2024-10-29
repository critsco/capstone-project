import { useState } from "react";
import { Input } from "antd";

export default function FloatInputPassword(props) {
	const {
		id,
		value,
		onChange,
		label,
		placeholder,
		onBlur,
		className,
		required,
		readOnly,
		disabled,
		type,
		prefix,
		addonAfter,
		addonBefore,
		allowClear,
		showCount,
		maxLength,
		autoComplete,
		size,
	} = props;

	const [focus, setFocus] = useState(false);

	let new_placeholder = placeholder ? placeholder : label;

	let hasValue = focus || (value && value !== "" && value.length !== 0);

	let labelClass =
		hasValue || (value && value === "0" && value.length !== 0)
			? "label float-label"
			: "label";

	let requiredMark = required ? <span className="text-danger">*</span> : null;

	return (
		<div
			className={`float-wrapper ${className ? className : ""}`}
			onBlur={() => setFocus(false)}
			onFocus={() => setFocus(true)}
		>
			<Input.Password
				id={id ?? ""}
				value={value}
				onChange={onChange}
				prefix={prefix}
				type={type}
				size={size ?? ""}
				autoComplete={autoComplete ?? "off"}
				disabled={disabled}
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
			/>
			<label className={labelClass}>
				{hasValue ? label : new_placeholder} {requiredMark}
			</label>
		</div>
	);
}
