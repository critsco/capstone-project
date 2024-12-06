import React, { useRef, useState } from "react";
import Button from "../../common/Button";
import Icon from "../../common/Icon";
import { isBlockActive } from "../../utils/SlateUtilityFunctions";
import usePopup from "../../utils/usePopup";
import { insertEmbed } from "../../utils/embed.js";
import { Flex, Upload } from "antd";
const Embed = ({ editor, format }) => {
    const urlInputRef = useRef();
    const [showInput, setShowInput] = usePopup(urlInputRef);
    const [formData, setFormData] = useState({
        url: "",
        // width: "",
        // height: "",
    });
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const handleButtonClick = (e) => {
        e.preventDefault();
        setShowInput((prev) => !prev);
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();
        insertEmbed(editor, { ...formData }, format);
        setShowInput(false);
        setFormData({
            url: "",
            // width: "",
            // height: "",
        });
    };

    const beforeUpload = (file) => {
        const isImage = file.type.startsWith("image/");
        if (!isImage) {
            message.error("You can only upload image files!");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("Image must be smaller than 2MB!");
        }
        return isImage && isLt2M;
    };

    const handleUpload = async (info) => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            // Handle the uploaded URL (assumes server returns a URL in `response.url`)
            const uploadedUrl = info.file.response?.url;
            if (uploadedUrl) {
                setImageUrl(uploadedUrl);
                message.success("Image uploaded successfully!");

                // Insert the uploaded image into the editor
                insertEmbed(editor, { url: uploadedUrl }, format);
            } else {
                message.error("Failed to upload image.");
            }
            setLoading(false);
            setShowInput(false);
        }
    };

    return (
        <div ref={urlInputRef} className="popup-wrapper">
            <Button
                active={isBlockActive(editor, format)}
                style={{
                    border: showInput ? "1px solid lightgray" : "",
                    borderBottom: "none",
                }}
                format={format}
                onClick={handleButtonClick}
            >
                <Icon icon={format} />
            </Button>
            {showInput && (
                <div className="popup">
                    {format === "image" && (
                        <Flex vertical>
                            <Upload
                                name="image"
                                listType="picture-card"
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                                onChange={handleUpload}
                                style={{ width: "100%" }}
                            >
                                <Button
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        gap: "10px",
                                        width: "100%",
                                    }}
                                >
                                    <Icon icon="upload" /> Upload
                                </Button>
                            </Upload>
                            <p
                                style={{
                                    textAlign: "center",
                                    opacity: "0.7",
                                    width: "100%",
                                }}
                            >
                                OR
                            </p>
                        </Flex>
                    )}
                    <form onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            placeholder="Enter url"
                            value={formData.url}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    url: e.target.value,
                                }))
                            }
                        />
                        {/* <input
                            type="text"
                            placeholder="Enter width of frame"
                            value={formData.width}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    width: e.target.value,
                                }))
                            }
                        />
                        <input
                            type="text"
                            placeholder="Enter height of frame"
                            value={formData.height}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    height: e.target.value,
                                }))
                            }
                        /> */}

                        <Button
                            style={{
                                width: "100%",
                            }}
                            type="submit"
                        >
                            Save
                        </Button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Embed;
