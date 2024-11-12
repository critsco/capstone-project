import React, { useState } from "react";
import { Button, Calendar, Flex, Select } from "antd";
import dayjs from "dayjs";

export default function FacultyCalendar() {
    const [value, setValue] = useState(dayjs());
    const onTodayClick = () => {
        setValue(dayjs());
    };

    return (
        <div className="faculty-calendar">
            <Calendar
                value={value}
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
                        <div style={{ padding: 8 }}>
                            <Flex dir="reverse" gap={6}>
                                <div>
                                    <Button
                                        type="text"
                                        style={{
                                            color: "#2c3d8f",
                                            fontWeight: "bold",
                                            border: "1px solid rgba(23, 26, 31, 0.12)",
                                        }}
                                        onClick={onTodayClick}
                                    >
                                        Today
                                    </Button>
                                </div>
                                <div style={{ display: "flex", gap: "6px" }}>
                                    <Select
                                        value={year}
                                        onChange={(newYear) => {
                                            const now = value
                                                .clone()
                                                .year(newYear);
                                            onChange(now);
                                        }}
                                        style={{ width: "100px" }}
                                    >
                                        {options}
                                    </Select>
                                    <Select
                                        value={month}
                                        onChange={(newMonth) => {
                                            const now = value
                                                .clone()
                                                .month(newMonth);
                                            onChange(now);
                                        }}
                                        style={{ width: "75px" }}
                                    >
                                        {monthOptions}
                                    </Select>
                                </div>
                            </Flex>
                        </div>
                    );
                }}
            />
        </div>
    );
}
