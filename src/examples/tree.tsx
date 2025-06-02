import { DropdownMenu } from '../components/menu';
import type { MenuItem } from '../types';

const menuItems = [
  {
    text: 'Item 1',
    children: [
      {
        text: 'Item 1 1',
        href: '#',
      },
      {
        text: 'Item 1 2',
        href: '#',
      },
    ],
  },
  {
    text: 'Item 2',
    href: '#',
  },
  {
    text: 'Item 3',
    children: [
      {
        text: 'Item 3 1',
        children: [
          {
            text: 'Item 3 1 1',
            href: '#',
          },
        ],
      },
    ],
  },
];

const Item = ({ item }: { item: MenuItem }) => {
  if (!item.children || item.children.length === 0) {
    return <DropdownMenu.Item>{item.text}</DropdownMenu.Item>;
  }

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>{item.text}</DropdownMenu.Trigger>
      <DropdownMenu.Sub>
        {item.children.map((child, index) => (
          <Item key={index} item={child} />
        ))}
      </DropdownMenu.Sub>
    </DropdownMenu>
  );
};

export function TreeExample() {
  return (
    <div
      className='rootBox'
      style={{
        maxWidth: 400,
      }}
    >
      <div className='box'>
        {menuItems.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
