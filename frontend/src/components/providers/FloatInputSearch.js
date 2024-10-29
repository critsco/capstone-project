import React, { useState } from "react";
import { Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/pro-regular-svg-icons";

const FloatInputSearch = (props) => {
	const {
		id,
		value,
		onChange,
		label,
		placeholder,
		required,
		className,
		suffix,
		size,
	} = props;

	const [focus, setFocus] = useState(false);

	let new_placeholder = placeholder ? placeholder : label;

	let isOccupied = focus || (value && value.length !== 0);

	let labelClass = isOccupied ? "label float-label" : "label";

	let requiredMark = required ? <span className="text-danger">*</span> : null;

	return (
		<div
			className={`float-wrapper float-input-search ${className ?? ""}`}
			onBlur={() => setFocus(false)}
			onFocus={() => setFocus(true)}
		>
			<Input
				id={id ?? ""}
				value={value}
				onChange={onChange}
				size={size ?? ""}
				autoComplete="off"
				suffix={suffix ?? <FontAwesomeIcon icon={faSearch} />}
				style={{ width: "100%" }}
				allowClear
			/>
			<label className={labelClass}>
				{isOccupied ? label : new_placeholder} {requiredMark}
			</label>
		</div>
	);
};

export default FloatInputSearch;
