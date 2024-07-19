import React from "react";
import { Checkbox } from "antd";

const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
};

const CheckboxFacultyLogin = () => (
    <Checkbox className="CheckboxFacultyLogin" onChange={onChange}>
        By using our services, you agree to abide by these terms and conditions,
        including the collection and use of personal data to enhance your
        experience and improve our services, for which users are responsible for
        the accuracy and legality of the information they provide.
    </Checkbox>
);

export default CheckboxFacultyLogin;
