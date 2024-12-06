import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAdd,
    faAlignCenter,
    faAlignLeft,
    faAlignRight,
    faBlockQuote,
    faBold,
    faH1,
    faH2,
    faH3,
    faImage,
    faItalic,
    faLinkSimple,
    faListOl,
    faListUl,
    faStrikethrough,
    faSubscript,
    faSuperscript,
    faTableCells,
    faTableColumns,
    faTableRows,
    faTrash,
    faUnderline,
    faUpload,
    faVideoPlus,
} from "@fortawesome/pro-regular-svg-icons";

const iconList = {
    bold: <FontAwesomeIcon icon={faBold} size="lg" />,
    italic: <FontAwesomeIcon icon={faItalic} size="lg" />,
    strikethrough: <FontAwesomeIcon icon={faStrikethrough} size="lg" />,
    underline: <FontAwesomeIcon icon={faUnderline} size="lg" />,
    headingOne: <FontAwesomeIcon icon={faH1} size="lg" />,
    headingTwo: <FontAwesomeIcon icon={faH2} size="lg" />,
    headingThree: <FontAwesomeIcon icon={faH3} size="lg" />,

    blockquote: <FontAwesomeIcon icon={faBlockQuote} size="lg" />,
    superscript: <FontAwesomeIcon icon={faSuperscript} size="sm" />,
    subscript: <FontAwesomeIcon icon={faSubscript} size="sm" />,
    alignLeft: <FontAwesomeIcon icon={faAlignLeft} size="lg" />,
    alignCenter: <FontAwesomeIcon icon={faAlignCenter} size="lg" />,
    alignRight: <FontAwesomeIcon icon={faAlignRight} size="lg" />,
    orderedList: <FontAwesomeIcon icon={faListOl} size="lg" />,
    unorderedList: <FontAwesomeIcon icon={faListUl} size="lg" />,
    link: <FontAwesomeIcon icon={faLinkSimple} size="lg" />,
    image: <FontAwesomeIcon icon={faImage} size="lg" />,
    upload: <FontAwesomeIcon icon={faUpload} size="lg" />,
    video: <FontAwesomeIcon icon={faVideoPlus} size="lg" />,
    add: <FontAwesomeIcon icon={faAdd} size="lg" />,
    table: <FontAwesomeIcon icon={faTableCells} size="lg" />,
    row: <FontAwesomeIcon icon={faTableRows} size="lg" />,
    column: <FontAwesomeIcon icon={faTableColumns} size="lg" />,
    removeTable: <FontAwesomeIcon icon={faTrash} size="lg" />,
};

const Icon = (props) => {
    const { icon } = props;
    return iconList[icon];
};

export default Icon;
