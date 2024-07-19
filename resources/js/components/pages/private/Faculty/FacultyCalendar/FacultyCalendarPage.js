import React, { useEffect } from "react";

import Footer from "../../../../ui/Footer";
import Navbar from "../../../../ui/Navbar";
import { Layout } from "antd";

export default function FacultyCalendarPage(props) {
    const { title } = props;

    useEffect(() => {
        document.title = title;

        return () => {};
    }, []);

    return (
        <Layout id="page_faculty_calendar">
            <Navbar />
            <Layout.Content>Calendar</Layout.Content>
            <Footer />
        </Layout>
    );
}
