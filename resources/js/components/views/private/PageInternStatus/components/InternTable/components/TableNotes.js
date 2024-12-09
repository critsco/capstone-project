import React, { useState } from "react";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNotes } from "@fortawesome/pro-regular-svg-icons";

import NotesModalForm from "./NotesModalForm";

export default function TableNotes(props) {
    const { id, field, note } = props;
    const [toggleModalForm, setToggleModalForm] = useState({
        open: false,
        id: null,
        field: null,
        note: null,
    });

    return (
        <>
            <Button
                onClick={() =>
                    setToggleModalForm({
                        open: true,
                        id: id,
                        field: field,
                        note: note,
                    })
                }
            >
                <FontAwesomeIcon icon={faNotes} fontSize="16px" />
            </Button>

            <NotesModalForm
                toggleModalForm={toggleModalForm}
                setToggleModalForm={setToggleModalForm}
            />
        </>
    );
}
