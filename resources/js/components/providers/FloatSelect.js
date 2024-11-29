import React, { useState } from "react";
import { Select } from "antd";

const FloatSelect = (props) => {
    const {
        id,
        value,
        onChange,
        label,
        placeholder,
        required,
        options,
        disabled,
        multi,
        popupClassName,
        allowClear,
        onBlur,
        size,
        className,
    } = props;

    const [focus, setFocus] = useState(false);

    let new_placeholder = placeholder ? placeholder : label;

    let isOccupied = focus || (value && value.length !== 0);

    let labelClass = isOccupied ? "label float-label" : "label";

    let multiClass = multi ? "float-select-multi" : "float-select";

    let requiredMark = required ? <span className="text-danger">*</span> : null;

    return (
        <div
            id={id ?? ""}
            className={`float-wrapper ${className ?? ""} ${multiClass}`}
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
        >
            <Select
                value={value}
                onChange={onChange}
                style={{ width: "100%" }}
                size={size ?? "middle"}
                allowClear={allowClear ?? allowClear}
                showSearch
                disabled={disabled ? disabled : false}
                mode={multi}
                popupClassName={`float-select-dropdown ${popupClassName ?? ""}`}
                onBlur={(e) => {
                    if (onBlur) {
                        onBlur(e);
                    }
                }}
                filterOption={(input, option) => {
                    // console.log("option", option);
                    return (
                        option.label
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                    );
                }}
            >
                {options.map((item, key) => {
                    return (
                        <Select.Option
                            key={key}
                            value={item.value}
                            data-json={item.json}
                            label={item.label}
                        >
                            {item.label}
                        </Select.Option>
                    );
                })}
            </Select>
            <label className={labelClass}>
                {isOccupied ? label : new_placeholder} {requiredMark}
            </label>
        </div>
    );
};

export default FloatSelect;
