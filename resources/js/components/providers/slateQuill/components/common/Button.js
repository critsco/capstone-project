import React from "react";

const Button = (props) => {
    const { children, format, active, style, ...rest } = props;
    return (
        <button
            className={active ? "btnActive" : "lol"}
            title={format}
            {...rest}
            style={style}
        >
            {children}
        </button>
    );
};

export default Button;
