import { useState } from 'react';
import s from './index.module.css';
import type { Message } from '../../types';
import { VirtualizedList } from '../../components/virtualized-list';

export function MapExample({ messages }: { messages: Message[] }) {
  const [mappedMessages] = useState<Map<string, Message | null>>(
    () => new Map(messages.map((message, index) => [`msg-${index}`, message]))
  );

  const [highlightedMessage, setHighlightedMessage] = useState<Message | null>(
    null
  );

  const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * mappedMessages.size);
    const message = mappedMessages.get(`msg-${randomIndex}`);
    if (message) {
      setHighlightedMessage(message);
    }
  };

  return (
    <div className={s.root}>
      <div className={s.box}>
        <p>Map size: {mappedMessages.size} items</p>
        {highlightedMessage ? (
          <p className={s.highlightedMessage}>
            Highlighted message:{' '}
            <span>
              {highlightedMessage?.userName} - {highlightedMessage?.text}
            </span>
          </p>
        ) : (
          <p>Press the button to highlight</p>
        )}
        <button onClick={getRandomMessage}>Highlight random message</button>
      </div>
      <div className={s.list}>
        <VirtualizedList
          items={messages}
          height={900}
          itemHeight={50}
          renderItem={(item) => (
            <div className={s.listItem}>
              <span>{item.userName}</span>
              <span>-</span>
              <span>{item.text}</span>
            </div>
          )}
        />
      </div>
    </div>
  );
}
