export interface Item {
  id: string;
  text: string;
  index?: number;
}

export interface MenuItem {
  label: string;
  url?: string;
  subItems?: MenuItem[];
}
