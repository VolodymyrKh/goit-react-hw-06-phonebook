import React from 'react';
import styles from './Notification.module.css'

const Notifification = ({onHideNotification}) => (
<span className={styles.notification} onClick={onHideNotification}>Contact already exists</span>   

);

export default Notifification;