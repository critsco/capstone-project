import { Button, Flex, Modal } from "antd";
import React from "react";

export default function ModalView(props) {
    const { toggleModalForm, setToggleModalForm } = props;

    return (
        <Modal
            title="Company Information"
            wrapClassName="company-info-view"
            open={toggleModalForm.open}
            onCancel={() => {
                setToggleModalForm({
                    open: false,
                    data: null,
                });
            }}
            footer={<></>}
        ></Modal>
    );
}
