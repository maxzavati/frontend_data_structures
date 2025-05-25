import { useState } from 'react';
import s from './index.module.css';
import type { Message } from '../../types';
import { Input } from '../../components/ui/input';
import { VirtualizedList } from '../../components/virtualized-list';

export function MapExample({ data }: { data: Message[] }) {
  const [messages, setMessages] = useState<Map<string, Message | null>>(
    () => new Map(data.map((message, index) => [`msg-${index}`, message]))
  );

  const [messageValue, setMessageValue] = useState('');
  const [messageIdValue, setMessageIdValue] = useState('');

  const [highlightedSize, setHighlightedSize] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState<{
    text: string;
    type: 'success' | 'error';
  }>({
    text: '',
    type: 'success',
  });

  // ----- Map manipulation -----
  const setMessage = () => {
    if (messageValue) {
      const newMap = new Map(messages);
      const newMapSize = newMap.size + 1;
      newMap.set(`msg-${newMapSize}`, {
        id: `msg-${newMapSize}`,
        text: `${messageValue} #${newMapSize}`,
        userName: 'User',
      });
      setMessages(newMap);
      // Cleanup and highlight
      setMessageValue('');
      highlightMessage();
    }
  };

  const getMessage = () => {
    const message = messages.get(`msg-${messageIdValue}`);
    if (message) {
      setNotificationMessage({
        text: `Last retrieved message: ${message.userName} ${message.text}`,
        type: 'success',
      });
      setMessageIdValue('');
    } else {
      setNotificationMessage({
        text: 'Message not found',
        type: 'error',
      });
    }
  };

  const deleteMessage = () => {
    if (messageIdValue) {
      const message = messages.get(`msg-${messageIdValue}`);
      if (message) {
        messages.delete(`msg-${messageIdValue}`);
        setNotificationMessage({
          text: `Last deleted message id: #${messageIdValue}`,
          type: 'success',
        });
        setMessageIdValue('');
        highlightMessage();
      } else {
        setNotificationMessage({
          text: 'Message not found',
          type: 'error',
        });
      }
    }
  };

  // ----- Utils -----
  function highlightMessage() {
    setHighlightedSize(true);
    setTimeout(() => {
      setHighlightedSize(false);
    }, 1000);
  }

  return (
    <div className={s.root}>
      <div className={s.box}>
        <p>Enter id (number from 0 to {messages.size})</p>
        <Input
          type='number'
          value={messageIdValue}
          onChange={(value) => setMessageIdValue(value)}
        />
        <div className={s.row}>
          <button onClick={getMessage}>Retrieve Message</button>
          <button onClick={deleteMessage}>Delete Message</button>
        </div>
      </div>

      <div className={s.box}>
        <Input
          type='text'
          value={messageValue}
          onChange={(value) => setMessageValue(value)}
        />
        <button onClick={setMessage}>Submit message</button>
      </div>

      <div className={s.box}>
        <div>Notifications</div>
        <p className={notificationMessage.type}>{notificationMessage.text}</p>
      </div>

      <div className={s.box}>
        <p>
          Map size:{' '}
          <span className={highlightedSize ? 'blink' : ''}>
            {messages.size}
          </span>{' '}
          items
        </p>
      </div>

      <div className={s.list}>
        <VirtualizedList<Message>
          items={Array.from(messages.values()).filter(
            (item): item is Message => item !== null
          )}
          height={500}
          itemHeight={50}
          getKey={(item) => item.id}
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
