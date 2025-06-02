import { createContext, useContext, useState, type ReactNode } from 'react';

const MenuContext = createContext({
  open: false,
  setOpen: (_: boolean | ((prevState: boolean) => boolean)) => {},
});

export function DropdownMenu({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <MenuContext.Provider value={{ open, setOpen }}>
      <menu>{children}</menu>
    </MenuContext.Provider>
  );
}

function Item({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

function Sub({ children }: { children: ReactNode }) {
  const { open } = useContext(MenuContext);
  if (!open) {
    return null;
  }
  return <div style={{ paddingLeft: '20px' }}>{children}</div>;
}

function Trigger({ children }: { children: ReactNode }) {
  const { open, setOpen } = useContext(MenuContext);
  return (
    <div onClick={() => setOpen((prev) => !prev)}>
      {children} {open ? '▼' : '▶'}
    </div>
  );
}

DropdownMenu.Trigger = Trigger;
DropdownMenu.Item = Item;
DropdownMenu.Sub = Sub;
