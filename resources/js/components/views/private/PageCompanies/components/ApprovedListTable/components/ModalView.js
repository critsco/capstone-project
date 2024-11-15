import React, { useEffect } from "react";
import { Button, Flex, Modal, Table } from "antd";

import { GET } from "../../../../../../providers/useAxiosQuery";

export default function ModalView(props) {
    const { toggleModalForm, setToggleModalForm } = props;

    const {
        data: dataSource,
        refetch: refetchSource,
        isLoading: isLoadingDataSource,
        isFetching: isFetchingDataSource,
    } = GET(`api/company/${toggleModalForm.data?.id}`, "company_profile_list");

    console.log("dataSource: ", dataSource?.data);

    useEffect(() => {
        refetchSource();

        return () => {};
    }, [toggleModalForm.data?.id]);

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
            width={850}
            loading={isLoadingDataSource}
            footer={
                <Flex justify="end">
                    <Button
                        key={1}
                        onClick={() => {
                            setToggleModalForm({
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
                dataSource={dataSource && dataSource.data}
                loading={isFetchingDataSource}
                pagination={false}
                bordered={true}
            >
                <Table.Column
                    title="Student Name"
                    key="fullname"
                    dataIndex="fullname"
                />
                <Table.Column
                    title="Year Level"
                    key="year_level"
                    dataIndex="ref_year_level.year_level"
                />
                <Table.Column
                    title="Department"
                    key="department"
                    dataIndex="ref_department.department"
                />
            </Table>
        </Modal>
    );
}
