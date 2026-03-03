export type PizzaSize = 'S' | 'M' | 'L';

export interface CartItem {
  id: string;
  name: string;
  size: PizzaSize;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderInfo {
  name: string;
  phone: string;
  address: string;
  note?: string;
}
