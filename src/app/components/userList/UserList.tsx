'use client';

import React, {useEffect, useState} from 'react';
import {User} from "@/app/interfaces/interfaces";
import UserCard from "@/app/components/userDetails/UserCard";
import {message, Row} from "antd";
import styles from "./UserList.module.css"

const UserList = ({ users, showSavedUsersButton }: { users: User[], showSavedUsersButton?: boolean | undefined }) => {
    const [savedUsers, setSavedUsers] = useState<User[]>([]);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
            setSavedUsers(JSON.parse(storedUsers));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(savedUsers));
    }, [savedUsers]);

    const saveUser = (user: User) => {
        if (!savedUsers.some(savedUser => savedUser.email === user.email)) {
            setSavedUsers([...savedUsers, user]);
            messageApi.open({
                type: 'success',
                content: 'Users saved successfully!',
            }).then(() => {});
        }
    };

    return (
        <Row gutter={[8, 16]} className={styles.cardContainer}>
            {contextHolder}
            {users.map((user, index) => {
                const isUserSaved = savedUsers?.some(savedUser => savedUser.email === user.email);
                return (
                    <UserCard
                        key={index}
                        user={user}
                        saveUser={saveUser}
                        isUserSaved={isUserSaved}
                        showSavedUsersButton={showSavedUsersButton}
                    />
                );
            })}
        </Row>
    );
};

export default UserList;