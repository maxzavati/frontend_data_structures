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

export function TreeExample() {
  console.log(menuItems);
  return <div></div>;
}
