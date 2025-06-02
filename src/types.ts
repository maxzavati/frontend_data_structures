export interface Item {
  id: string;
  text: string;
  index?: number;
}

export interface MenuItem {
  text: string;
  href?: string;
  children?: MenuItem[];
}
