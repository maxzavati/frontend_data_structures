import type { Item } from './types';

export function generateItems(count: number): Item[] {
  const messages = [];
  for (let i = 0; i < count; i++) {
    messages.push({
      id: `msg-${i + 1}`,
      text: `Item #${i + 1}`,
    });
  }
  return messages;
}
