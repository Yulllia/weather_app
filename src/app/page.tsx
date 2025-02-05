"use client";

import Link from "next/link";
import styles from "./home.module.css";

export default function HomePage() {
    return (
        <div className={styles.homeContainer}>
            <h1>Welcome to the User Directory</h1>
            <p>Browse users and save your favorites!</p>
            <div className={styles.links}>
                <Link href={"/users"}>Go to Users</Link>
                <Link href={"/saved-users"}>View Saved Users</Link>
            </div>
        </div>
    );
}