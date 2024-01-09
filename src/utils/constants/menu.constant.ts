export type MENU_ITEM_TYPE = {
  text: string
  path: string
  params?: string
  auth: false
}

export const MENU: MENU_ITEM_TYPE[] = [
  {
    text: 'Online Shop',
    path: '/online-shop',
    auth: false,
  },
  {
    text: 'Car Cleaning',
    path: '/car-leaning',
    auth: false,
  },
  {
    text: 'Home Cleaning',
    path: '/home-cleaning',
    auth: false,
  },
  {
    text: 'Commerce Cleaning',
    path: '/commerce-cleaning',
    auth: false,
  },
  {
    text: 'Redemption Center',
    path: '/redemption-center',
    auth: false,
  },
  {
    text: 'News',
    path: '/news',
    auth: false,
  },
]

export const LEFT_MENU_ALL_SERVICE = [
  {
    image: '/img/ic-car-leaning.png',
    title: 'Car cleaning',
  },
  {
    image: '/img/ic-home-cleaning.png',
    title: 'Home cleaning',
  },
  {
    image: '/img/ic-commerce-cleaning.png',
    title: 'Commerce cleaning',
  },
  {
    image: '/img/ic-coupon.png',
    title: 'Coupon',
  },
  {
    image: '/img/ic-gift-card.png',
    title: 'Gift card',
  },
]

export const LEFT_MENU_ONLINE_SHOP = [
  {
    image: '/img/ic-coupon.png',
    title: 'Coupon',
    path: '/coupon',
  },
  {
    image: '/img/ic-services.png',
    title: 'Services',
    path: '/service',
  },
]

export const FOOTER = [
  {
    title: 'SERVICE',
    items: [
      {
        name: 'Car Cleaning',
        path: '',
      },
      {
        name: 'Commerce Cleaning',
        path: '',
      },
      {
        name: 'Home Cleaning',
        path: '',
      },
    ],
  },
  {
    title: 'COMPANY',
    items: [
      {
        name: 'News',
        path: '',
      },
      {
        name: 'Member center',
        path: '',
      },
    ],
  },
  {
    title: 'LEGAL',
    items: [
      {
        name: 'Terms & Conditions',
        path: '',
      },
      {
        name: 'Privacy Policy',
        path: '',
      },
    ],
  },
]
