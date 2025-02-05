'use client';

import {useCallback, useEffect, useState} from "react";
import {User} from "@/app/interfaces/interfaces";
import {fetchUsers, getLatLonFromAddress} from "@/app/services/apiService";
import styles from "@/app/home.module.css";
import BackButton from "@/app/components/backButton/BackButton";
import UserList from "@/app/components/userList/UserList";
import {Button, Spin} from "antd";

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState<boolean>(true);
  const usersToDisplay = 8;

  useEffect(() => {
    loadUsers().catch((error) => {
      console.error(error)
    })
  }, []);

  const loadUsers = useCallback(async () => {
    setLoadingMore(true);
    try {
      const users = await fetchUsers(usersToDisplay, page);

      const updatedUsers = await Promise.all(
          users.map(async (user: User) => {
            const address = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.country} ${user.location.postcode}`;
            const coords = await getLatLonFromAddress(address) || { lat: 0, lon: 0 };

            return {
              ...user,
              location: {
                ...user.location,
                address,
                coordinates: {
                  latitude: coords.lat,
                  longitude: coords.lon,
                },
              },
            };
          })
      );
      setUsers(prevUsers => [...prevUsers, ...updatedUsers]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoadingMore(false);
    }
  }, [usersToDisplay, page]);

  return (
      <>
        <div className={styles.pageContainer}>
          <>
            <BackButton/>
            <h1 className={styles.pageTitle}>Random Users</h1>
            <UserList users={users}/>
            {loadingMore ? <Spin size="small"/> :
                <Button onClick={loadUsers} className={styles.loadMoreButton}>Load More Users</Button>}
          </>
        </div>
      </>
  );
}
