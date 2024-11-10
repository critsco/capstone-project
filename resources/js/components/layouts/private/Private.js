import React, { useEffect } from "react";
import ClearCache from "react-clear-cache";
import { Button, Layout } from "antd";
import { lineSpinner } from "ldrs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGifts, faRefresh } from "@fortawesome/pro-regular-svg-icons";

import { apiUrl } from "../../providers/companyInfo";
import Footer from "./Footer";
import Navbar from "./Navbar";

lineSpinner.register();

export default function Private(props) {
    const { children, moduleName, title, pageId, className } = props;

    useEffect(() => {
        const section = document.querySelector(".private-layout");
        section.scrollIntoView({ behavior: "smooth", block: "start" });

        document.title = moduleName ?? title;
    }, [title, moduleName]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token"); // Retrieve the token

                await axios.get(apiUrl("api/check_auth_status"), {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error("Unauthorized access - 401");
                    // Handle 401 error (e.g., redirect to login page)
                    localStorage.clear();
                    window.location.reload();
                } else {
                    console.error("Error fetching data", error);
                }
            }
        };

        fetchData();
    }, []);

    return (
        <ClearCache>
            {({ isLatestVersion, emptyCacheStorage }) => (
                <>
                    {!isLatestVersion && (
                        <div className="notification-notice">
                            <div className="notification-notice-content">
                                <div className="notification-notice-icon">
                                    <FontAwesomeIcon icon={faGifts} />
                                </div>
                                <div className="notification-notice-message">
                                    <div className="title">
                                        Updates Now Available
                                    </div>
                                    <div className="description">
                                        A new version of this Web App is ready
                                    </div>
                                    <div className="action">
                                        <Button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                emptyCacheStorage();
                                            }}
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={faRefresh}
                                                />
                                            }
                                        >
                                            Refresh
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <Layout
                        className={`private-layout ${className ?? ""}`}
                        id={pageId ?? ""}
                    >
                        <Navbar />
                        {children}
                        <Footer />
                    </Layout>
                </>
            )}
        </ClearCache>
    );
}
