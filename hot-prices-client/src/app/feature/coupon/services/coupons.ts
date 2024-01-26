import { PostStatus } from 'src/app/common/enums/post-status.enum';
import { Coupon } from '../models/coupon.model';
import { SaleType } from 'src/app/common/enums/sale-type.enum';

export const COUPONS: Coupon[] = [
  {
    id: 1,
    title: 'Get 10% off on your first order at Zalando',
    imgPaths: [
      'https://m.media-amazon.com/images/I/71eB2BcRInL._AC_UY327_FMwebp_QL65_.jpg',
      'https://images.hotukdeals.com/threads/raw/9Z0jX/4254964_8/re/1024x1024/qt/60/4254964_8.jpg',
    ],
    numOfHotReactions: 10,
    numOfColdReactions: 2,
    numOfDegrees: 8,
    postedDate: new Date('2023-12-04T15:48:07'),
    status: PostStatus.Expired,
    owner: 'Bing',
    category: {
      id: 1,
      name: 'Kategorija 1',
      imgPaths: ['path1', 'path2'],
    },
    reactions: [],
    comments: [],
    reports: [],
    description: 'Get 10% off on your first order at Zalando',
    store: 'Zalando',
    code: 'ZALANDO10',
    link: 'https://www.zalando.com/coupon',
    discounts: {
      Display: 20,
    },
    saleType: SaleType.Online,
    expiryDate: new Date('2023-12-31'),
    restricted: false,

  },
  {
    id: 2,
    title: "Get a free Big Mac with any purchase at McDonald's",
    imgPaths: [
      'https://m.media-amazon.com/images/I/81hmWAdXP8L._AC_UY327_FMwebp_QL65_.jpg',
      'https://images.hotukdeals.com/threads/raw/ITSJg/4254964_6/re/1024x1024/qt/60/4254964_6.jpg',
    ],
    numOfHotReactions: 8,
    numOfColdReactions: 4,
    numOfDegrees: 8,

    postedDate: new Date('2023-12-03T12:30:00'),
    status: PostStatus.Available,
    owner: 'Bing',
    category: {
      id: 1,
      name: 'Kategorija 1',
      imgPaths: ['path1', 'path2'],
    },
    reactions: [],
    comments: [],
    reports: [],
    description: "Get a free Big Mac with any purchase at McDonald's",
    store: "McDonald's",
    code: 'BIGMAC',
    link: 'https://www.mcdonalds.com/coupon',
    saleType: SaleType.Online,
    discounts: {
      Camera: 30,
    },
    expiryDate: new Date('2023-12-10'),
    restricted: false,

  },
  {
    id: 3,
    title: 'Get 50% off on your first month of Netflix',
    imgPaths: [
      'https://images.hotukdeals.com/threads/raw/YbPsP/4255049_5/re/1024x1024/qt/60/4255049_5.jpg',
      'https://images.hotukdeals.com/threads/raw/YbPsP/4255049_6/re/1024x1024/qt/60/4255049_6.jpg',
    ],
    numOfHotReactions: 6,
    numOfColdReactions: 3,
    numOfDegrees: 8,

    postedDate: new Date('2023-12-02T10:15:00'),
    status: PostStatus.Available,
    owner: 'Bing',
    category: {
      id: 1,
      name: 'Kategorija 1',
      imgPaths: ['path1', 'path2'],
    },
    reactions: [],
    comments: [],
    reports: [],
    description: 'Get 50% off on your first month of Netflix',
    store: 'Netflix',
    code: 'NETFLIX50',
    link: 'https://www.netflix.com/coupon',
    saleType: SaleType.Online,
    discounts: {
      Battery: 40,
    },
    expiryDate: new Date('2023-12-31'),
    restricted: false,

  },
  {
    id: 4,
    title: 'Get 20% off on Nike shoes at Foot Locker',
    imgPaths: [
      'https://images.hotukdeals.com/threads/raw/9Z0jX/4254964_9/re/1024x1024/qt/60/4254964_9.jpg',
      'https://images.hotukdeals.com/threads/raw/9Z0jX/4254964_10/re/1024x1024/qt/60/4254964_10.jpg',
    ],
    numOfHotReactions: 7,
    numOfColdReactions: 5,
    numOfDegrees: 8,

    postedDate: new Date('2023-12-01T16:45:00'),
    status: PostStatus.Available,
    owner: 'Bing',
    category: {
      id: 1,
      name: 'Kategorija 1',
      imgPaths: ['path1', 'path2'],
    },
    reactions: [],
    comments: [],
    reports: [],
    description: 'Get 20% off on Nike shoes at Foot Locker',
    store: 'Foot Locker',
    code: 'NIKE20',
    link: 'https://www.footlocker.com/coupon',
    saleType: SaleType.Online,
    discounts: {
      Display: 20,
      Camera: 30,
      Battery: 40,
    },
    expiryDate: new Date('2023-12-31'),
    restricted: false,

  },
];
