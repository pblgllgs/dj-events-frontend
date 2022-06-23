import React, { Children } from 'react';
import styles from '@/styles/EventItem.module.css';
import Image from 'next/image';
import Link from 'next/link';

const EventItem = ({ evt, imgs }) => {
    const {id, attributes} =  evt;
    return (
        <div className={styles.event}>
            <div className={styles.img}>
                <Image
                    src={imgs ? imgs[id - 1].url : '/images/event-default.png'}
                    width={170}
                    height={100}
                />
            </div>
            <div className={styles.info}>
                <span>
                    {' '}
                    {attributes.date} at {attributes.time}
                </span>
                <h3>{attributes.name}</h3>
            </div>
            <div className={styles.link}>
                <Link href={`/events/${attributes.slug}`}>
                    <a className="btn">Details</a>
                </Link>
            </div>
        </div>
    );
};

export default EventItem;
