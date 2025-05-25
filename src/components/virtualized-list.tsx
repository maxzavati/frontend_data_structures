import { useRef, useState, type ReactNode } from 'react';

export function VirtualizedList<T>({
  items,
  height,
  itemHeight,
  renderItem,
  getKey,
}: {
  items: T[];
  height: number;
  itemHeight: number;
  renderItem: (item: T, index: number) => ReactNode;
  getKey: (item: T) => string | number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  };

  const totalHeight = items.length * itemHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight));
  const visibleCount = Math.ceil(height / itemHeight) + 1;
  const endIndex = Math.min(items.length - 1, startIndex + visibleCount);

  const offsetY = startIndex * itemHeight;

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        height: `${height}px`,
        overflow: 'auto',
      }}
    >
      <div style={{ height: `${totalHeight}px`, paddingRight: '1.6rem' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {items.slice(startIndex, endIndex + 1).map((item, index) => (
            <div key={getKey(item)} style={{ height: `${itemHeight}px` }}>
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
