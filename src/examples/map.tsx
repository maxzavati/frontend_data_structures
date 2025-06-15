import { useState } from 'react';
import type { Item } from '../types';
import { generateItems } from '../utils';

const data = generateItems(10000);

export function MapExample() {
  const [items, setItems] = useState<Map<string, Item | null>>(
    () => new Map(data.map((message, index) => [`item-${index + 1}`, message]))
  );

  const [itemId, setItemId] = useState('');
  const [highlightedSize, setHighlightedSize] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState<{
    text: string;
    type: 'success' | 'error';
  }>({
    text: '',
    type: 'success',
  });

  // ----- Map manipulations -----
  const handleSetItem = () => {
    setItems((prev) => {
      const newMap = new Map(prev);
      const newMapSize = newMap.size + 1;
      newMap.set(`item-${newMapSize}`, {
        id: `item-${newMapSize}`,
        text: `Item #${newMapSize}`,
      });
      return newMap;
    });

    highlight();
  };

  const handleGetItem = () => {
    const item = items.get(`item-${itemId}`);

    if (item) {
      setNotificationMessage({
        text: `Last retrieved item: ${item.text}`,
        type: 'success',
      });
      setItemId('');
    } else {
      setNotificationMessage({
        text: 'Item not found',
        type: 'error',
      });
    }
  };

  const handleDeleteItem = () => {
    if (itemId) {
      setItems((prev) => {
        const newMap = new Map(prev);
        const hasItem = newMap.has(`item-${itemId}`);

        if (hasItem) {
          newMap.delete(`item-${itemId}`);

          setNotificationMessage({
            text: `Last deleted item id: #${itemId}`,
            type: 'success',
          });
          setItemId('');
          highlight();
        } else {
          setNotificationMessage({
            text: 'Item not found',
            type: 'error',
          });
        }

        return newMap;
      });
    }
  };

  // ----- Utils -----
  function highlight() {
    setHighlightedSize(true);
    setTimeout(() => {
      setHighlightedSize(false);
    }, 1000);
  }

  return (
    <div
      className='rootBox'
      style={{
        maxWidth: 450,
      }}
    >
      <div className='box'>
        <p>Enter id (number from 1 to {items.size})</p>
        <input
          className='input'
          type='text'
          value={itemId}
          onChange={(event) => setItemId(event.target.value)}
        />
        <div className='row'>
          <button onClick={handleSetItem}>Set Item</button>
          <button onClick={handleGetItem} disabled={!itemId}>
            Get Item
          </button>
          <button onClick={handleDeleteItem} disabled={!itemId}>
            Delete Item
          </button>
        </div>
      </div>

      <div className='box'>
        <p>
          Map size:{' '}
          <span className={highlightedSize ? 'blink' : ''}>{items.size}</span>{' '}
          items
        </p>
        <div>Notifications:</div>
        <p className={notificationMessage.type}>{notificationMessage.text}</p>
      </div>
    </div>
  );
}
