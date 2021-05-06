import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/pages/home',
    home: true,
  },
  {
    title: 'Products',
    icon: 'list-outline',
    link: '/pages/products',
  },
  {
    title: 'Customer',
    icon: 'people-outline',
    link: '/pages/customer',
  },
  {
    title: 'Orders',
    icon: 'shopping-cart-outline',
    link: '/pages/orders',
  },
  {
    title: 'Upload',
    icon: 'upload-outline',
    link: '/pages/products/upload',
  }
];
