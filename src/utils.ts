import type { Message } from './types';

export function generateMessages(count: number): Message[] {
  const names = [
    'Alice',
    'Bob',
    'Charlie',
    'Diana',
    'Evan',
    'Fiona',
    'George',
    'Hannah',
  ];
  const messages = [];
  for (let i = 0; i < count; i++) {
    messages.push({
      id: `msg-${i}`,
      text: `This is message #${i}`,
      userName: names[Math.floor(Math.random() * names.length)],
    });
  }
  return messages;
}
