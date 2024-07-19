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
    // const clearContent = (
    //     <Flex vertical={true} style={{ padding: "4px" }}>
    //         <Flex gap={8} style={{ marginBlock: "auto" }}>
    //             <FontAwesomeIcon
    //                 icon={faCircleExclamation}
    //                 fontSize={18}
    //                 color="orange"
    //             />
    //             <p>Are you sure you want to clear the notes?</p>
    //         </Flex>
    //         <Flex justify="flex-end" gap={6}>
    //             <Button onClick={}>Cancel</Button>
    //             <Button
    //                 style={{
    //                     background: "#2c3d8f",
    //                     color: "white",
    //                 }}
    //                 onClick={clearNote}
    //             >
    //                 Confirm
    //             </Button>
    //         </Flex>
    //     </Flex>
    // );
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
                    description="Are you sure you want to clear this note?"
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
            className="moa-notes"
        >
            <FontAwesomeIcon icon={faNotes} fontSize="16px" fontWeight="bold" />
        </Popover>
    );
}
