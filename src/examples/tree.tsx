import { DropdownMenu } from '../components/menu';
import type { MenuItem } from '../types';

const navigation = [
  {
    label: 'Dashboard',
    subItems: [
      {
        label: 'Overview',
        url: '#',
      },
      {
        label: 'Stats',
        url: '#',
      },
    ],
  },
  {
    label: 'Profile',
    url: '#',
  },
  {
    label: 'Settings',
    subItems: [
      {
        label: 'Preferences',
        url: '#',
      },
      {
        label: 'Security',
        subItems: [
          {
            label: 'Passwords',
            url: '#',
          },
          {
            label: 'Advanced Settings',
            url: '#',
            subItems: [
              {
                label: 'Encryption',
                url: '#',
              },
              {
                label: 'Permissions',
                url: '#',
              },
            ],
          },
        ],
      },
    ],
  },
];

const Item = ({ item }: { item: MenuItem }) => {
  if (!item.subItems || item.subItems.length === 0) {
    return <DropdownMenu.Item>{item.label}</DropdownMenu.Item>;
  }

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>{item.label}</DropdownMenu.Trigger>
      <DropdownMenu.Sub>
        {item.subItems.map((subItem, index) => (
          <Item key={index} item={subItem} />
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
        maxWidth: 450,
      }}
    >
      <div className='box'>
        {navigation.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
