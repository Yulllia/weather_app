'use client'; // Mark as a Client Component
import {Card, Modal} from 'antd';
import {WeatherDataToDisplay} from "@/app/interfaces/interfaces";
import {FC} from "react";
import {getWeatherIcon} from "@/app/utils/weatherUtils";
import styles from "./WeatherModal.module.css";

interface WeatherProps {
    weather: WeatherDataToDisplay;
    visible: boolean;
    onClose: () => void;
}


const WeatherModal: FC<WeatherProps> = ({ weather, visible, onClose }) => {
    return (
        <Modal title={
            <div className={styles.modalContainer}>
                <span className={styles.modalTitle}>Weather Temperature for Current Date {weather.time}</span>
            </div>
        } open={visible} onCancel={onClose} footer={null}>
            <div className={styles.dailyTemperature}>
                <div className={styles.temperatureContainer}>
                    <div className={styles.temperatureItem}>
                        <p>Highest Temp</p>
                        <h2>{weather.dailyHighestTemperature}°C</h2>
                    </div>
                    <div className={styles.temperatureItem}>
                        <p>Current Temp</p>
                        <h2>{weather.currentTemperature}°C</h2>
                    </div>
                    <div className={styles.temperatureItem}>
                        <p>Lowest Temp</p>
                        <h2>{weather.dailyLowestTemperature}°C</h2>
                    </div>
                </div>
            </div>
            <div className={styles.hourlyWeatherRow}>
                {weather.hourlyWeather.map((hourlyWeather) => {
                    return (
                        <div className={styles.hourlyWeatherCard} key={hourlyWeather.id}>
                        <Card bordered={false} className={styles.temperatureCard}>
                        <h3>Hour: {hourlyWeather.hour}</h3>
                            <span className={styles.weatherIcon}>{getWeatherIcon(hourlyWeather.weatherCode)}</span>
                            <h2>{hourlyWeather.temperature}°C</h2>
                        </Card>
                    </div>
                )
             })}
            </div>
        </Modal>
    );
};

export default WeatherModal;