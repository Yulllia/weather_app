'use client';

import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {User} from "@/app/interfaces/interfaces";
import styles from "@/app/home.module.css";
import UserList from "@/app/components/userList/UserList";
import BackButton from "@/app/components/backButton/BackButton";
import {Button, Spin} from "antd";

const SavedUsersPage = () => {
    const [savedUsers, setSavedUsers] = useState<User[]>([]);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState<User[]>([]);  // Track all users in localStorage

    const usersToDisplay = 8;

    const shouldShowLoadMoreButton = useMemo(() => {
        return savedUsers.length < totalUsers.length;
    }, [savedUsers.length, totalUsers.length]);

    useEffect(() => {
            const savedUserData = JSON.parse(localStorage.getItem('users') || '[]');
            if (savedUserData) {
                setSavedUsers(savedUserData.slice(0, usersToDisplay));
                setTotalUsers(savedUserData);
            }
    }, []);

    const loadUsers = useCallback( () => {
        setLoadingMore(true);
        try {
            const savedUserData = JSON.parse(localStorage.getItem('users') || '[]');
            const start = page * usersToDisplay;
            const newUsers = savedUserData.slice(start, start + usersToDisplay);
            setSavedUsers(prevUsers => [...prevUsers, ...newUsers]);
            setPage(prevPage => prevPage + 1);
            setLoadingMore(false);
        } catch (error) {
            console.error('Error loading users:', error);
        } finally {
            setLoadingMore(false);
        }
    }, [usersToDisplay, page]);

    return (
        <div className={styles.pageContainer}>
            <>
              <BackButton/><h1 className={styles.pageTitle}>Saved Users</h1>
             {savedUsers.length > 0 ? (
                <UserList users={savedUsers} showSavedUsersButton={true}/>
               ) : (
                <p className={styles.noSavedUser}>No users saved yet!</p>
               )}
                {shouldShowLoadMoreButton && (
                    loadingMore ? <Spin size="small" /> : <Button onClick={loadUsers} className={styles.loadMoreButton}>Load More Users</Button>
                )}
            </>
        </div>
    );
};

export default SavedUsersPage;
