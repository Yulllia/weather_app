import styles from "./BackButton.module.css";
import Link from "next/link";
import {Tooltip} from "antd";

const BackButton = () => {
    return (
        <div className={styles.buttonContainer}>
            <Tooltip title="Back to HomePage">
                <Link href="/" className={styles.previousButton}>&#8249;</Link>
            </Tooltip>
        </div>
    );
};

export default BackButton;
