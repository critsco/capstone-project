import React, { useEffect } from "react";

import Footer from "../../../../ui/Footer";
import Navbar from "../../../../ui/Navbar";
import { Layout } from "antd";

export default function FacultyProfilePage(props) {
    const { title } = props;

    useEffect(() => {
        document.title = title;

        return () => {};
    }, []);

    return (
        <Layout id="page_faculty_profile">
            <Navbar />
            <Layout.Content>Profile</Layout.Content>
            <Footer />
        </Layout>
    );
}
