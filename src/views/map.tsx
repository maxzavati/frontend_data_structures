import { MapExample } from '../examples/map';
import { generateMessages } from '../utils';

export function MapView() {
  const messages = generateMessages(10000);

  return <MapExample messages={messages} />;
}
