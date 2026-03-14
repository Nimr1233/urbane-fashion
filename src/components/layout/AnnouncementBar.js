'use client';
import styles from './AnnouncementBar.module.css';

export default function AnnouncementBar() {
    const messages = ['FW-25 LIVE NOW.', 'Easy Exchanges and Returns'];
    const repeated = [...messages, ...messages, ...messages, ...messages];

    return (
        <div className={styles.bar}>
            <div className={styles.track}>
                {repeated.map((msg, i) => (
                    <span key={i} className={styles.item}>
                        {msg}
                        <span className={styles.dot}>•</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
