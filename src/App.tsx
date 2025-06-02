import { Tabs } from './components/tabs';
import { MapExample } from './examples/map';
import { SetExample } from './examples/set';
import { StackExample } from './examples/stack';
import { QueueExample } from './examples/queue';
import { TreeExample } from './examples/tree';

function App() {
  return (
    <main>
      <Tabs defaultValue='map'>
        <Tabs.List>
          <Tabs.Trigger value='map'>Map</Tabs.Trigger>
          <Tabs.Trigger value='set'>Set</Tabs.Trigger>
          <Tabs.Trigger value='stack'>Stack</Tabs.Trigger>
          <Tabs.Trigger value='queue'>Queue</Tabs.Trigger>
          <Tabs.Trigger value='tree'>Tree</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value='map'>
          <MapExample />
        </Tabs.Content>
        <Tabs.Content value='set'>
          <SetExample />
        </Tabs.Content>
        <Tabs.Content value='stack'>
          <StackExample />
        </Tabs.Content>
        <Tabs.Content value='queue'>
          <QueueExample />
        </Tabs.Content>
        <Tabs.Content value='tree'>
          <TreeExample />
        </Tabs.Content>
      </Tabs>
    </main>
  );
}

export default App;
