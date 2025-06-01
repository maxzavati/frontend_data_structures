import { useState } from 'react';
import type { Item } from '../types';
import { generateItems } from '../utils';
import { Input } from '../components/ui/input';
import { VirtualizedList } from '../components/virtualized-list';

const data = generateItems(10000);

export function MapExample() {
  const [items, setItems] = useState<Map<string, Item | null>>(
    () => new Map(data.map((message, index) => [`item-${index + 1}`, message]))
  );

  const [itemValue, setItemValue] = useState('');
  const [itemId, setItemId] = useState('');

  const [highlightedSize, setHighlightedSize] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState<{
    text: string;
    type: 'success' | 'error';
  }>({
    text: '',
    type: 'success',
  });

  // ----- Map manipulation -----
  const setItem = () => {
    if (itemValue) {
      setItems((prev) => {
        const newMap = new Map(prev);
        const newMapSize = newMap.size + 1;
        newMap.set(`item-${newMapSize}`, {
          id: `item-${newMapSize}`,
          text: `${itemValue} #${newMapSize}`,
        });
        return newMap;
      });

      // Cleanup and highlight
      setItemValue('');
      highlight();
    }
  };

  const getItem = () => {
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

  const deleteItem = () => {
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
        maxWidth: 400,
      }}
    >
      <div className='box'>
        <p>Enter id (number from 1 to {items.size})</p>
        <Input
          type='number'
          value={itemId}
          onChange={(value) => setItemId(value)}
        />
        <div className='row'>
          <button onClick={getItem} disabled={!itemId}>
            Get Item
          </button>
          <button onClick={deleteItem} disabled={!itemId}>
            Delete Item
          </button>
        </div>
      </div>

      <div className='box'>
        <Input
          type='text'
          value={itemValue}
          onChange={(value) => setItemValue(value)}
        />
        <button onClick={setItem} disabled={!itemValue}>
          Set Item
        </button>
      </div>

      <div className='box'>
        <div>Notifications</div>
        <p className={notificationMessage.type}>{notificationMessage.text}</p>
      </div>

      <div className='box'>
        <p>
          Map size:{' '}
          <span className={highlightedSize ? 'blink' : ''}>{items.size}</span>{' '}
          items
        </p>
      </div>

      <div className='list'>
        <VirtualizedList<Item>
          items={Array.from(items.values()).filter(
            (item): item is Item => item !== null
          )}
          height={500}
          itemHeight={50}
          getKey={(item) => item.id}
          renderItem={(item) => (
            <div className='listItem'>
              <span>{item.text}</span>
            </div>
          )}
        />
      </div>
    </div>
  );
}
