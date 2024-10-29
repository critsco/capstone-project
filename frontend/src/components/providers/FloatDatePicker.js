import React, { useState } from "react";
import { DatePicker } from "antd";

const FloatDatePicker = (props) => {
	const {
		id,
		value,
		onChange,
		label,
		placeholder,
		required,
		popupClassName,
		format,
		picker,
		disabled,
		disabledDate,
		allowClear,
		className,
		size,
		showTime,
		onBlur,
	} = props;

	const [focus, setFocus] = useState(false);

	let new_placeholder = !placeholder ? label : placeholder;

	let isOccupied = focus || (value && value.length !== 0);

	let labelClass = isOccupied ? "label float-label" : "label";

	let requiredMark = required ? <span className="text-danger">*</span> : null;

	return (
		<div
			className={`float-wrapper float-date-picker ${className ?? ""}`}
			onBlur={() => setFocus(false)}
			onFocus={() => setFocus(true)}
		>
			<DatePicker
				id={id ?? ""}
				onChange={onChange}
				value={value ? value : null}
				size={size ?? "middle"}
				placeholder={[""]}
				popupClassName={popupClassName ?? ""}
				format={format ? format : "DD/MM/YYYY"}
				allowClear={allowClear ?? false}
				showTime={showTime ?? false}
				onBlur={(date, dateString) => {
					if (onBlur) {
						onBlur(date, dateString);
					}
				}}
				picker={picker ? picker : "date"}
				disabled={disabled ? disabled : false}
				disabledDate={(current) => {
					if (disabledDate) {
						return disabledDate(current);
					} else {
						return false;
					}
				}}
			/>

			<label className={labelClass}>
				{isOccupied ? label : new_placeholder} {requiredMark}
			</label>
		</div>
	);
};

export default FloatDatePicker;
