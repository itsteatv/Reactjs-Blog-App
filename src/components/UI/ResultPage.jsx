import { Fragment } from 'react';
import { FileExclamationOutlined } from '@ant-design/icons';
import { Button, Result, Typography } from 'antd';
import { Link } from 'react-router-dom';
import styles from "./ResultPage.module.css";
const { Paragraph, Text } = Typography;
import { useSelector, useDispatch } from 'react-redux';

const ResultPage = ({ userData }) => {
    const isRegistered = useSelector((state) => state.register.isRegistered);
    const isLoggedIn = useSelector((state) => state.register.isLoggedIn);

    const extras = (
        <Fragment key="register_Login">
            <Link style={{ marginInlineEnd: "auto" }} to="/register">
                <Button className={styles["redirect-btn"]} type="primary" key="register">
                    Register
                </Button>
            </Link>
            <Link to="/login">
                <Button className={styles["redirect-btn"]} key="login">Login</Button>
            </Link>
        </Fragment>
    )

    if (!userData) {
        return (
            <Result
                className={styles["result-container"]}
                status="error"
                icon={<FileExclamationOutlined />}
                title={<span className={styles.text}>No User Data</span>}
                subTitle={
                    <div>
                        <Paragraph className={styles.text}>
                            Currently, we are unable to fetch your data.
                        </Paragraph>
                        <Paragraph className={styles.text}>
                            Please refresh the page or try logging in again.
                        </Paragraph>
                    </div>
                }
                extra={extras}
            />
        );
    }

    if (!isRegistered || !isLoggedIn) {
        return (
            <Result
                className={styles["result-container"]}
                status="error"
                icon={<FileExclamationOutlined />}
                title={<span className={styles.text}>Access Denied</span>}
                subTitle={
                    <div>
                        <Paragraph className={styles.text}>
                            You Need To Be Logged In or Registered To Access This Page.
                        </Paragraph>
                    </div>
                }
                extra={extras}
            />
        );
    }
};

export default ResultPage;
