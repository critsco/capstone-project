import React, { useEffect } from "react";
import { Button, Empty, Flex, Modal, Table } from "antd";

import { GET } from "../../../../../../providers/useAxiosQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/pro-regular-svg-icons";

export default function ModalView(props) {
    const { toggleModalView, setToggleModalView } = props;

    const {
        data: dataSource,
        refetch: refetchSource,
        isLoading: isLoadingDataSource,
        isFetching: isFetchingDataSource,
    } = GET(`api/company/${toggleModalView.data?.id}`, "company_profile_list");

    // console.log("dataSource: ", dataSource?.data);

    useEffect(() => {
        refetchSource();

        return () => {};
    }, [toggleModalView.data?.id]);

    return (
        <Modal
            title="Company Information"
            wrapClassName="company-info-view"
            open={toggleModalView.open}
            onCancel={() => {
                setToggleModalView({
                    open: false,
                    data: null,
                });
            }}
            width={850}
            loading={isLoadingDataSource}
            footer={
                <Flex justify="end">
                    <Button
                        key={1}
                        onClick={() => {
                            setToggleModalView({
                                open: false,
                                data: null,
                            });
                        }}
                    >
                        Close
                    </Button>
                </Flex>
            }
        >
            <div className="table-title">Assigned Students</div>
            <Table
                dataSource={
                    dataSource?.data
                        ? dataSource.data.map((item) => ({
                              ...item,
                              key: item.id, // Use the unique `id` field as the key
                          }))
                        : []
                }
                loading={isFetchingDataSource}
                pagination={false}
                bordered={true}
                locale={{
                    emptyText: (
                        <Empty
                            image={
                                <FontAwesomeIcon
                                    icon={faFolderOpen}
                                    style={{ color: "#e7e7e7" }}
                                />
                            }
                            description="No students were assigned"
                        />
                    ),
                }}
            >
                <Table.Column
                    title="Student Name"
                    key="fullname"
                    dataIndex="fullname"
                />
                <Table.Column
                    title="Year Level"
                    key="year_level"
                    dataIndex={["ref_year_level", "year_level"]}
                />
                <Table.Column
                    title="Department"
                    key="department"
                    dataIndex={["ref_department", "department"]}
                />
            </Table>
        </Modal>
    );
}
