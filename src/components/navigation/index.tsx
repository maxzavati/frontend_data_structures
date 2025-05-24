import { Link, useLocation } from 'react-router-dom';
import s from './index.module.css';

export function Navigation() {
  const location = useLocation();

  function checkActiovePath(segment: string): boolean {
    return location.pathname.slice(1) === segment.toLowerCase();
  }

  return (
    <nav className={s.root}>
      <Link to='/map' className={checkActiovePath('map') ? s.active : ''}>
        Map
      </Link>
      <Link to='/set' className={checkActiovePath('set') ? s.active : ''}>
        Set
      </Link>
      <Link to='/stack' className={checkActiovePath('stack') ? s.active : ''}>
        Stack
      </Link>
      <Link to='/queue' className={checkActiovePath('queue') ? s.active : ''}>
        Queue
      </Link>
      <Link to='/tree' className={checkActiovePath('tree') ? s.active : ''}>
        Tree
      </Link>
    </nav>
  );
}
