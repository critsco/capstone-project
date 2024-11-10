import { useNavigate } from "react-router-dom";
import { Layout, Result, Button } from "antd";

export default function Page403(props) {
    const { pageId } = props;
    const navigate = useNavigate();

    return (
        <Layout id={pageId ?? ""}>
            <Layout.Content>
                <Result
                    status="403"
                    title="403"
                    subTitle="Sorry, you're not authorized to access this page."
                    extra={
                        <Button
                            type="primary"
                            onClick={() => navigate("/dashboard")}
                        >
                            Go Back
                        </Button>
                    }
                />
            </Layout.Content>
        </Layout>
    );
}
