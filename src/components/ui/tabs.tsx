import { createContext, useContext, useState, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const TabsContext = createContext({
  tabValue: '',
  setTabValue: (_: string | ((prevState: string) => string)) => {},
});

export function Tabs({ children }: Props) {
  const [tabValue, setTabValue] = useState('');
  return (
    <TabsContext.Provider value={{ tabValue, setTabValue }}>
      {children}
    </TabsContext.Provider>
  );
}

function Trigger({ value, children }: { value: string; children: ReactNode }) {
  const { setTabValue } = useContext(TabsContext);
  return (
    <li>
      <button onClick={() => setTabValue(value)}>{children}</button>
    </li>
  );
}

function List({ children }: { children: ReactNode }) {
  return <ul>{children}</ul>;
}

function Content({ value, children }: { value: string; children: ReactNode }) {
  const { tabValue } = useContext(TabsContext);
  if (tabValue != value) return null;
  return <div>{children}</div>;
}

Tabs.Trigger = Trigger;
Tabs.List = List;
Tabs.Content = Content;
