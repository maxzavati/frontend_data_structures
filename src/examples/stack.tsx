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

      const newItems = [...state.items];
      if (previousItem) {
        newItems.push(previousItem);
      }

      return {
        items: newItems,
        historyStack: newHistoryStack,
      };
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
        maxWidth: 300,
      }}
    >
      <button onClick={onUndo} disabled={!state.historyStack.length}>
        Undo Last Action
      </button>
      <ul>
        {state.items.map((item) => (
          <li key={item.id} className='listItem rowSpaceBetween'>
            {item.text}{' '}
            <button onClick={() => onRemoveItem(item)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
