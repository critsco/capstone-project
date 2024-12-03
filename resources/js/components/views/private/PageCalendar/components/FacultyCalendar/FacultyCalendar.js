import React, { useState } from "react";
import { Button, Calendar, Flex, Select } from "antd";
import dayjs from "dayjs";

export default function FacultyCalendar() {
    const [value, setValue] = useState(dayjs());
    const onTodayClick = () => {
        setValue(dayjs());
    };

    return (
        <Calendar
            value={value}
            rootClassName="faculty-dashboard-calendar"
            fullscreen={false}
            onPanelChange={setValue}
            onChange={setValue}
            headerRender={({ value, type, onChange, onTypeChange }) => {
                const start = 0;
                const end = 12;
                const monthOptions = [];

                const current = value.clone();
                const localeData = value.localeData();
                for (let i = 0; i < 12; i++) {
                    monthOptions.push(
                        <Select.Option key={i} value={i}>
                            {localeData.monthsShort(current.month(i))}
                        </Select.Option>
                    );
                }
                const month = value.month();

                const year = value.year();
                const options = [];
                for (let i = year - 60; i < year + 10; i += 1) {
                    options.push(
                        <Select.Option key={i} value={i}>
                            {i}
                        </Select.Option>
                    );
                }

                return (
                    <Flex gap={6} align="center" justify="flex-end">
                        <Button type="text" onClick={onTodayClick}>
                            Today
                        </Button>
                        <Flex gap={6}>
                            <Select
                                value={year}
                                onChange={(newYear) => {
                                    const now = value.clone().year(newYear);
                                    onChange(now);
                                }}
                            >
                                {options}
                            </Select>
                            <Select
                                value={month}
                                onChange={(newMonth) => {
                                    const now = value.clone().month(newMonth);
                                    onChange(now);
                                }}
                            >
                                {monthOptions}
                            </Select>
                        </Flex>
                    </Flex>
                );
            }}
        />
    );
}
