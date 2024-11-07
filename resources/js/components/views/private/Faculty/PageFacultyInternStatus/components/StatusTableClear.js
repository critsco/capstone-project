import { faNotes } from "@fortawesome/pro-light-svg-icons";
import { faCheck, faXmark } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Flex, Input, Popconfirm, Popover } from "antd";
import React, { useState } from "react";

export default function StatusTableClear({ record, note }) {
    const [currentNote, setCurrentNote] = useState(note);

    const handleNoteChange = (e) => {
        setCurrentNote(e.target.value);
    };
    const clearNote = () => {
        setCurrentNote("");
    };
    const noteContent = (
        <Flex gap={2}>
            <Flex
                align="center"
                style={{
                    border: "1px solid #dee1e6",
                    borderRadius: "6px",
                    paddingRight: "8px",
                    gap: "10px",
                }}
            >
                <Input
                    value={currentNote}
                    onChange={handleNoteChange}
                    style={{ border: "0", borderRadius: "2" }}
                    placeholder="Enter notes here"
                />
                <Popconfirm
                    title="Clear the note"
                    description="Do you want to clear this note?"
                    okText="Yes"
                    onConfirm={clearNote}
                    cancelText="No"
                >
                    <FontAwesomeIcon icon={faXmark} cursor="pointer" />
                </Popconfirm>
            </Flex>

            <Button style={{ width: "10px" }}>
                <FontAwesomeIcon icon={faCheck} fontSize={14} />
            </Button>
        </Flex>
    );

    return (
        <Popover
            content={noteContent}
            title="Notes"
            trigger="click"
            className="table-notes"
        >
            <FontAwesomeIcon icon={faNotes} fontSize="16px" fontWeight="bold" />
        </Popover>
    );
}
