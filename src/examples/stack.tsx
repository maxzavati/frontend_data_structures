import { useReducer } from 'react';
import { generateItems } from '../utils';
import type { Item } from '../types';

type State = {
  items: Item[];
  historyStack: Item[];
};

type Action = { type: 'remove'; item: Item } | { type: 'undo' };

const data = generateItems(10);

const initialState: State = {
  items: data,
  historyStack: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'remove': {
      const newHistoryStack = [...state.historyStack];
      newHistoryStack.push(action.item);

      return {
        items: state.items.filter((item) => item.id != action.item.id),
        historyStack: newHistoryStack,
      };
    }

    case 'undo': {
      const newHistoryStack = [...state.historyStack];
      const previousItem = newHistoryStack.length
        ? newHistoryStack.pop()
        : null;

      if (previousItem && previousItem.index !== undefined) {
        const newItems = [
          ...state.items.slice(0, previousItem.index),
          previousItem,
          ...state.items.slice(previousItem.index),
        ];
        return {
          items: newItems,
          historyStack: newHistoryStack,
        };
      } else {
        return state;
      }
    }

    default:
      throw new Error('Unknown action');
  }
}

export function StackExample() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onRemoveItem = (item: Item) => {
    dispatch({ type: 'remove', item });
  };

  const onUndo = () => {
    dispatch({ type: 'undo' });
  };

  return (
    <div
      className='box'
      style={{
        maxWidth: 450,
      }}
    >
      <button onClick={onUndo} disabled={!state.historyStack.length}>
        Undo Last Action
      </button>
      <ul>
        {state.items.map((item, index) => (
          <li key={item.id} className='listItem rowSpaceBetween'>
            {item.text}{' '}
            <button
              className='deleteButton'
              onClick={() =>
                onRemoveItem({
                  ...item,
                  index,
                })
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
