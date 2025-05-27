import type { Item } from './types';

export function generateItems(count: number): Item[] {
  const messages = [];
  for (let i = 0; i < count; i++) {
    messages.push({
      id: `msg-${i}`,
      text: `Item #${i}`,
    });
  }
  return messages;
}
