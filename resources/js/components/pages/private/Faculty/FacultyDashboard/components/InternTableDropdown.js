import { faNotes } from "@fortawesome/pro-light-svg-icons";
import { faCheck } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Flex, Input, Popover } from "antd";
import React, { useState } from "react";

export default function InternTableDropdown({ record, note }) {
    const [currentNote, setCurrentNote] = useState(note);

    const handleNoteChange = (e) => {
        setCurrentNote(e.target.value);
    };
    const moaContent = (
        <Flex gap={2}>
            <Input
                value={currentNote}
                onChange={handleNoteChange}
                placeholder="Enter notes here"
            />
            <Button style={{ width: "10px" }}>
                <FontAwesomeIcon icon={faCheck} fontSize={14} />
            </Button>
        </Flex>
    );

    return (
        <Popover
            content={moaContent}
            title="Notes"
            trigger="click"
            className="moa-notes"
        >
            <FontAwesomeIcon icon={faNotes} fontSize="16px" />
        </Popover>
    );
}
