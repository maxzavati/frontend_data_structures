import { createContext, useContext, useState, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  defaultValue?: string;
}

const TabsContext = createContext({
  tabValue: '',
  setTabValue: (_: string | ((prevState: string) => string)) => {},
});

export function Tabs({ children, defaultValue = '' }: Props) {
  const [tabValue, setTabValue] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ tabValue, setTabValue }}>
      {children}
    </TabsContext.Provider>
  );
}

function Trigger({ value, children }: { value: string; children: ReactNode }) {
  const { tabValue, setTabValue } = useContext(TabsContext);
  const isActive = value == tabValue;
  return (
    <li
      style={{
        width: '100%',
      }}
    >
      <button
        onClick={() => setTabValue(value)}
        style={{
          width: '100%',
          background: 'none',
          opacity: isActive ? 1 : 0.5,
        }}
      >
        {children}
      </button>
    </li>
  );
}

function List({ children }: { children: ReactNode }) {
  return (
    <ul
      style={{
        display: 'flex',
        gap: '1rem',
        paddingBottom: '1.6rem',
        marginBottom: '3.2rem',
        borderBottom: '1px solid var(--grey6)',
      }}
    >
      {children}
    </ul>
  );
}

function Content({ value, children }: { value: string; children: ReactNode }) {
  const { tabValue } = useContext(TabsContext);
  if (tabValue != value) return null;
  return <div>{children}</div>;
}

Tabs.Trigger = Trigger;
Tabs.List = List;
Tabs.Content = Content;
