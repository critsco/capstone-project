import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Flex, Layout, Row } from "antd";

import ApprovedListTable from "./components/ApprovedListTable/ApprovedListTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";
import AddModalForm from "./components/AddModalForm/AddModalForm";

export default function PageCompanies() {
    const [toggleModalForm, setToggleModalForm] = useState({
        open: false,
    });

    return (
        <Layout.Content>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <Flex justify="space-between" align="center">
                        <div className="dashboard-title">
                            Approved Companies
                        </div>
                        <Flex gap={6}>
                            <Button
                                className="add-btn"
                                onClick={() =>
                                    setToggleModalForm({
                                        open: true,
                                    })
                                }
                            >
                                <FontAwesomeIcon icon={faPlus} />
                                Company
                            </Button>
                            <Link to="/companies/archive">
                                <Button className="archive-btn">Archive</Button>
                            </Link>
                        </Flex>
                    </Flex>
                    <ApprovedListTable />
                </Col>
            </Row>

            <AddModalForm
                toggleModalForm={toggleModalForm}
                setToggleModalForm={setToggleModalForm}
            />
        </Layout.Content>
    );
}
