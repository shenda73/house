export interface Link {
  id: number;
  orderId: number;
  url: string,
  icon: string,
  title?: string,
  help?: Link;
}