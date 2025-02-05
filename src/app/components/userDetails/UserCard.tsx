import {Card, Button, Col, Tooltip, Spin} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {FC, useCallback, useEffect, useState} from "react";
import {User, WeatherDataToDisplay} from "@/app/interfaces/interfaces";
import WeatherModal from "@/app/components/modal/WeatherModal";
import {fetchWeather} from "@/app/services/apiService";
import Image from "next/image";
import styles from "./UserCard.module.css";
import {getCurrentWeather} from "@/app/utils/weatherUtils";
import dynamic from "next/dynamic";
import {useInterval} from "@/app/utils/localStorageUtils";

interface UserProps {
    user: User;
    saveUser: (user: User) => void;
    showSavedUsersButton?: boolean | undefined;
    isUserSaved?: boolean;
}
const UserLocationMap = dynamic(() => import('../map/UserLocationMap'), { ssr: false, loading: () => <Spin/> });

const UserCard: FC<UserProps> = ({ user, saveUser, showSavedUsersButton, isUserSaved }) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [weather, setWeather] = useState<WeatherDataToDisplay | null>(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const weatherData = await fetchWeather(user.location.coordinates.latitude, user.location.coordinates.longitude);
                const currentWeather = getCurrentWeather(weatherData);
                setWeather({
                    hourlyWeather: weatherData.hourly.time.map((time: string, index: number) => ({
                        id: index,
                        hour: time.split('T')[1],
                        temperature: weatherData.hourly.temperature_2m[index],
                        weatherCode: weatherData.hourly.weathercode[index],
                    })),
                    dailyHighestTemperature: weatherData.daily.temperature_2m_max[0],
                    dailyLowestTemperature: weatherData.daily.temperature_2m_min[0],
                    time: weatherData.daily.time[0].replace(/-/g, "."),
                    currentTemperature: currentWeather?.currentTemperature,
                    currentWeatherCode: currentWeather?.currentWeatherCode,
                });
            } catch (error){
                console.error('Error loading weather details:', error);
            }
        };
        fetchWeatherData().catch((e)=>console.log(e))
    }, [user]);


    const updateCurrentTemperature = useCallback(async () => {
        if (!weather) return;

        try {
            const weatherData = await fetchWeather(user.location.coordinates.latitude, user.location.coordinates.longitude);
            const currentWeather = getCurrentWeather(weatherData);

            setWeather(prevWeather => {
                if (!prevWeather) return null;
                return {
                    ...prevWeather,
                    currentTemperature: currentWeather?.currentTemperature,
                };
            });
        } catch (error) {
            console.error('Error updating temperature:', error);
        }
    }, [weather, user.location.coordinates.latitude, user.location.coordinates.longitude]);

    useInterval(updateCurrentTemperature, 300000);

    const closeWeatherModal = () => {
        setIsModalVisible(false);
    };
    const showWeatherModal = () => {
        setIsModalVisible(true);
    };


    return (
        <Col className="gutter-row" xs={24} sm={12} md={11} lg={6} xl={5}>
            <Card
                hoverable
                className={styles.card}
                cover={<Image alt="User profile" src={user.picture.large} width={120} height={128}
                              className={styles.coverImage}/>}
            >
                <Card.Meta
                    className={styles.titleContainer}
                    avatar={<UserOutlined />}
                    title={<span className={styles.userName}>{user.name.first} {user.name.last}</span>}
                />
                <div className={styles.userDetails}>
                    <Tooltip title={user.email}>
                      <p className={styles.email}><strong>Email:</strong> {user.email}</p>
                    </Tooltip>
                    <Tooltip title={user.gender}>
                      <p className={styles.gender}><strong>Gender:</strong> {user.gender}</p>
                    </Tooltip>
                    <UserLocationMap
                        latitude={parseFloat(user.location.coordinates.latitude)}
                        longitude={parseFloat(user.location.coordinates.longitude)}
                        locationName={`${user.location.city}, ${user.location.country}`}
                        profileImage={user.picture.large}
                    />
                    <Tooltip title={`${user.location.city}, ${user.location.country}`}>
                      <p className={styles.location}><strong>Location:</strong> {user.location.city}, {user.location.country}</p>
                    </Tooltip>
                </div>
                    <div className={styles.buttonContainer}>
                        {!showSavedUsersButton && <Tooltip title={isUserSaved ? "This user is already saved": ""} placement="top"><Button disabled={isUserSaved} onClick={() => saveUser(user)} type="primary" className={styles.saveButton}>
                            Save
                        </Button></Tooltip>}
                        <Button onClick={showWeatherModal}>Weather</Button>
                    </div>
                {weather && <WeatherModal visible={isModalVisible} onClose={closeWeatherModal} weather={weather}/>}
            </Card>
        </Col>
);
};

export default UserCard;
