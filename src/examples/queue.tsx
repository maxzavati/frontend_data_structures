import { useState } from 'react';
import type { Item } from '../types';

export function QueueExample() {
  const [notifications, setNotification] = useState<Item[]>([]);

  const onNotification = () => {
    setNotification((prev) => {
      const newNotifications = [...prev];
      newNotifications.push({
        text: `This is norification #${notifications.length + 1}`,
        id: `notif-${notifications.length + 1}`,
      });
      return newNotifications;
    });

    setTimeout(() => {
      setNotification((prev) => {
        const newNotifications = [...prev];
        if (newNotifications.length) {
          newNotifications.shift();
        }
        return newNotifications;
      });
    }, 2000);
  };

  return (
    <div
      className='rootBox'
      style={{
        maxWidth: 400,
      }}
    >
      <div className='box'>
        <button onClick={onNotification}>Set notification</button>
        <p>Notification timer: 2 seconds</p>
        {notifications.length ? (
          <ul className='list'>
            {notifications.map((item) => (
              <li key={item.id} className='listItem'>
                {item.text}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
