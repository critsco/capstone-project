import React, { useState } from "react";
import { Button, Calendar, Flex, Select } from "antd";
import dayjs from "dayjs";

export default function StudentCalendar() {
    const [value, setValue] = useState(dayjs());
    const onTodayClick = () => {
        setValue(dayjs());
    };

    return (
        <Calendar
            value={value}
            rootClassName="student-dashboard-calendar"
            fullscreen={false}
            onPanelChange={setValue}
            onChange={setValue}
            headerRender={() => {
                return null;
            }}
        />
    );
}
