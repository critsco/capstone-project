import React, { useState } from "react";
import { Button, Card, Flex, List, notification, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashXmark } from "@fortawesome/pro-regular-svg-icons";

import {
    DELETE,
    GET,
} from "../../../../../../../../../../providers/useAxiosQuery";
import ModalView from "./components/ModalView";
import notificationErrors from "../../../../../../../../../../providers/notificationErrors";

export default function ClassList(props) {
    const [toggleModalView, setToggleModalView] = useState({
        open: false,
        data: null,
    });

    const { dataProfile } = props;

    const { data: dataInternClasses } = GET(
        `api/get_classes/${dataProfile?.id}`,
        "intern_classes_list"
    );

    const { mutate: mutateDeleteClass, isLoading: isLoadingClass } = DELETE(
        `api/intern_classes`,
        "intern_classes_list"
    );

    const handleArchive = (item) => {
        mutateDeleteClass(item, {
            onSuccess: (res) => {
                if (res.success) {
                    notification.success({
                        message: "Class",
                        description: res.message,
                    });
                } else {
                    notification.error({
                        message: "Class",
                        description: res.message,
                    });
                }
            },
            onError: (err) => {
                notificationErrors(err);
            },
        });
    };

    return (
        <>
            {dataInternClasses?.data.length ? (
                <List
                    grid={{
                        gutter: 8,
                    }}
                    dataSource={dataInternClasses && dataInternClasses?.data}
                    renderItem={(item) => (
                        <List.Item>
                            <Card className="class-card">
                                <div className="class-title">
                                    {item.class_code}
                                </div>
                                <Flex gap={6}>
                                    <Button
                                        className="view-btn"
                                        onClick={() =>
                                            setToggleModalView({
                                                open: true,
                                                data: item,
                                            })
                                        }
                                    >
                                        View
                                    </Button>
                                    <Popconfirm
                                        title="Are you sure to delete this class?"
                                        onConfirm={() => {
                                            handleArchive(item);
                                        }}
                                        onCancel={() => {
                                            notification.error({
                                                message: "Class",
                                                description: "Data not deleted",
                                            });
                                        }}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button
                                            className="delete-btn"
                                            loading={isLoadingClass}
                                        >
                                            <FontAwesomeIcon
                                                icon={faTrashXmark}
                                                size="lg"
                                            />
                                        </Button>
                                    </Popconfirm>
                                </Flex>
                            </Card>
                        </List.Item>
                    )}
                />
            ) : null}

            <ModalView
                toggleModalView={toggleModalView}
                setToggleModalView={setToggleModalView}
            />
        </>
    );
}
