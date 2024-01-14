export type MENU_ITEM_TYPE = {
  title: string
  path: string
  subMenu?: MENU_ITEM_TYPE[]
}

export const MENU: MENU_ITEM_TYPE[] = [
  {
    title: 'About me',
    path: '/about-me',
  },
  {
    title: 'Travel',
    path: '/travel',
    subMenu: [
      {
        title: 'Vietnam',
        path: '/travel/vietnam',
      },
      {
        title: 'World',
        path: '/travel/world',
      },
    ],
  },
  {
    title: 'Photography',
    path: '/photography',
    subMenu: [
      {
        title: 'Interior',
        path: '/photography/interior',
      },
      {
        title: 'Product',
        path: '/photography/product',
      },
      {
        title: 'Review',
        path: '/photography/review',
      },
    ],
  },
  {
    title: 'Videography',
    path: '/videography',
    subMenu: [
      {
        title: 'Cinematic',
        path: '/videography/cinematic',
      },
      {
        title: 'Commercial',
        path: '/videography/commercial',
      },
    ],
  },
  {
    title: 'Lifestyle',
    path: '/lifestyle',
  },
  {
    title: 'Food',
    path: '/food',
  },
  {
    title: 'Personal Projects',
    path: '/personal-projects',
  },
  {
    title: 'Design',
    path: '/design',
  },
  {
    title: 'Pricing',
    path: '/pricing',
  },
  {
    title: 'Contact',
    path: '/contact',
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
