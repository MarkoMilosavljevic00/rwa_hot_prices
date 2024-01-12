import { SaleType } from 'src/app/common/enums/sale-type.enum';
import { PostStatus } from 'src/app/common/enums/post-status.enum';
import { Offer } from '../models/offer.model';

export const OFFERS: Offer[] = [
  {
    id: 1,
    title: '50% off on Samsung Galaxy S21',
    description:
      '<h2><strong>The Samsung Galax</strong><span style="color: rgb(0, 138, 0);">y S21 is a 5G smartph</span>one with a 6<span class="ql-font-serif">.2-inch</span> Dynamic AMOLED 2X display, a </h2><ul><li>64MP triple camera, an<strong>d a </strong></li><li class="ql-align-center"><strong>4000mAh battery.</strong></li><li class="ql-align-center"><strong><span class="ql-cursor">﻿</span></strong><img src="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAeCAYAAAA/xX6fAAAACXBIWXMAAAsSAAALEgHS3X78AAADZklEQVRIiZVXS0wTURS98+nMlNIWdUeRlgllow5ujC4MNnFjYgSCbBQ/hbjRRGCpRiPGDUt140YNMVFjjAoYjKIhhYif+Am48UMEplCkfEI/JIKa1NyxM7wOnc7MSSZ9895978y9c++ZWyqTyYBViEGpHgCUS56OeXiOG2dZ9kFqceqs1TNMCcWgtB0AwtnLq85PRKc0G5qmMwLPjzpYtjOxEL1vm1AMSgGCxJ9vI0lIgmGYvwLPD7Msez4xL78yJBSDUglBUl3oKXft3AE/43MQGVp3Xg4cDvYXz3HPWYZtX5qXZYWwonJbOPte6gruJnDvzi2Yjc9BfWOT1S0g8Pysw8H2IaH1rAGAMl8pDEWeKeOKqmqYlKN2tgNtyxoA2lpPaeOOC2fsblcIB60aezxuONhQq93X1+6HkhJvwT0kOI5L2PKwOXwk597r9UD76ZN2jlA8HLFq3BI+um4ufOywZTKWYSaRMGHFuLGhDtzuYmUci82AnK1Df/lmy6QURSUte9jWuha6q9euQ8flTu3ealhpmn5jyUMsdJ+vVBmn08vQ/3IAunv7IJlMKXPV0lYI1ew2JaQoiCPhpJkh6V3/iwFIpdKQSCQVUhXtreZeUhT9QZE2MSgZFj9Z6Iia0D6Yjs0oWhrwl8PE91FtzUwIMqtLlFoWSWPv1godk6WszKeEGEOIhDIh4oWEAL8ooIq3GJQiALBHb4SFPvJx2PAQPfCdBqokJdx6YNGvpuMbVA/zJo6+0M1QSAhoilohPewAgIt6o9FPr7Xa+/L1m5IsKlZWVrUxyhtmKgJDHAhK6whdRUWDy0uxEGv00GShIw41teQQkh9gMnlUIei6fTe/p9nfiH6BLIWHj3pzyPTAzOx58lSbzRdWhqG7wejzRBb6f8IeQzIVpEeFhEAlzJE3MlmwFN6+e29KiCJAloheCGiKfgy6nmbErJchYdRE5QP2Nr+X54tID2F87DO2g80AIFs+yQTYwbmLXTdVMtC/w/Gxz10AgMSXCqmPGVBVsAzcLldlanH6BGlu2Ahn28YrAHA837pRSJ2C8IPnuL1qW6iHlc4bm+IuvfTpCVG6nIJwIF/zS8LyfwsxKIWyHiuJpRJiQjgF4VxyYQrXzIGEdi5snP3ilijj3PTHvdF3w9b+TAb+Afl3jDi6Q4zhAAAAAElFTkSuQmCC"></li></ul>',
    imgPaths: [
      'https://images.hotukdeals.com/threads/raw/rIwn3/4254964_1/re/1024x1024/qt/60/4254964_1.jpg',
      'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg',
      'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg',
      'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg',
      'https://images.hotukdeals.com/threads/raw/rIwn3/4254964_1/re/1024x1024/qt/60/4254964_1.jpg',
    ],
    numOfHotReactions: 10,
    numOfColdReactions: 2,
    postedDate: new Date('2023-12-04T15:48:07'),
    status: PostStatus.Available,
    owner: 'Bing',
    category: {
      id: 1,
      name: 'Kategorija 1',
      imgPaths: ['path1', 'path2'],
    },
    restricted: false,
    reactions: [],
    comments: [],
    reports: [],
    saleType: SaleType.Online,
    store: 'Amazon',
    location: 'USA',
    link: 'https://www.amazon.com/Samsung-Galaxy-S21',
    specifications: {
      Display: '6.2 inches',
      Camera: '64 MP',
      Battery: '4000 mAh',
    },
    oldPrice: 999.99,
    price: 499.99,
    discount: 50,
    expiryDate: new Date('2023-12-31'),
  },
  {
    id: 2,
    title: 'Buy one get one free pizza at Domino’s',
    description:
      "Domino's is offering buy one get one free on any pizza at menu price when you order online and choose carryout.",
    imgPaths: [
      'https://images.hotukdeals.com/threads/raw/ITSJg/4254964_1/re/1024x1024/qt/60/4254964_1.jpg',
      'pizza2.jpg',
    ],
    numOfHotReactions: 8,
    numOfColdReactions: 4,
    postedDate: new Date('2023-12-03T12:30:00'),
    status: PostStatus.Available,
    owner: 'Bing',
    category: {
      id: 2,
      name: 'Kategorija 2',
      imgPaths: ['path3', 'path4'],
    },
    restricted: false,

    reactions: [],
    comments: [],
    reports: [],
    saleType: SaleType.Online,
    store: 'Domino’s',
    link: 'https://www.dominos.com/coupons',
    specifications: { Size: 'Large', Toppings: 'Any', Crust: 'Any' },
    oldPrice: 19.99,
    price: 9.99,
    discount: 50,
    expiryDate: new Date('2023-12-10'),
  },
  {
    id: 3,
    title: 'Free coffee with any purchase at Starbucks',
    description:
      'Starbucks is offering a free coffee with any purchase when you sign up for their Starbucks Rewards Program. You can sign up for free here.',
    imgPaths: [
      'https://images.hotukdeals.com/threads/raw/YbPsP/4255049_1/re/1024x1024/qt/60/4255049_1.jpg',
      'coffee2.jpg',
    ],
    numOfHotReactions: 6,
    numOfColdReactions: 3,
    postedDate: new Date('2023-12-02T10:15:00'),
    status: PostStatus.Available,
    owner: 'Nidza',
    category: {
      id: 3,
      name: 'Kategorija 3',
      imgPaths: ['path5', 'path6'],
    },
    restricted: false,

    reactions: [],
    comments: [],
    reports: [],
    saleType: SaleType.Offline,
    store: 'Starbucks',
    link: undefined,
    specifications: { Coffee: 'Any size and flavor', Purchase: 'Minimum $5' },
    oldPrice: undefined,
    price: 1,
    expiryDate: new Date('2023-12-15'),
  },
  {
    id: 4,
    title: '20% off on Nike shoes at Foot Locker',
    description:
      'Foot Locker is offering 20% off on Nike shoes when you use the promo code NIKE20 at checkout. Shipping is free on orders over $50.',
    imgPaths: ['nike1.jpg', 'nike2.jpg'],
    numOfHotReactions: 7,
    numOfColdReactions: 5,
    postedDate: new Date('2023-12-01T16:45:00'),
    status: PostStatus.Available,
    owner: 'Bing',
    category: {
      id: 4,
      name: 'Kategorija 4',
      imgPaths: ['path7', 'path8'],
    },
    restricted: false,

    reactions: [],
    comments: [],
    reports: [],
    saleType: SaleType.Offline,
    store: 'Foot Locker',
    link: undefined,
    specifications: { Shoes: 'Nike brand only', Size: 'Any' },
    oldPrice: undefined,
    price: 1,
    expiryDate: new Date('2023-12-31'),
  },
  {
    id: 5,
    title: '10% off on Spotify Premium subscription',
    description:
      'Spotify is offering 10% off on Spotify Premium subscription for students. You can sign up for free here.',
    imgPaths: ['spotify1.jpg', 'spotify2.jpg'],
    numOfHotReactions: 9,
    numOfColdReactions: 1,
    postedDate: new Date('2023-11-30T18:00:00'),
    status: PostStatus.Available,
    owner: 'Bing',
    category: {
      id: 5,
      name: 'Kategorija 5',
      imgPaths: ['path9', 'path10'],
    },
    restricted: false,

    reactions: [],
    comments: [],
    reports: [],
    saleType: SaleType.Online,
    store: 'Spotify',
    link: 'https://www.spotify.com/premium',
    specifications: {
      Subscription: 'Monthly or yearly',
      Benefits: 'Ad-free music, offline listening, unlimited skips',
    },
    oldPrice: 9.99,
    price: 8.99,
    expiryDate: new Date('2023-12-31'),
  },
  {
    id: 6,
    title: 'Buy two get one free book at Barnes & Noble',
    description:
      'Barnes & Noble is offering buy two get one free on selected books. You can see the list of books here.',
    imgPaths: ['book1.jpg', 'book2.jpg'],
    numOfHotReactions: 5,
    numOfColdReactions: 4,
    postedDate: new Date('2023-11-29T14:30:00'),
    status: PostStatus.Available,
    owner: 'Bing',
    category: {
      id: 6,
      name: 'Dete 1',
      imgPaths: ['path11', 'path12'],
      parent: {
        id: 1,
        name: 'Kategorija 1',
        imgPaths: ['path1', 'path2'],
      },
    },
    restricted: false,

    reactions: [],
    comments: [],
    reports: [],
    saleType: SaleType.Online,
    store: 'Barnes & Noble',
    link: 'https://www.barnesandnoble.com/b/buy-2-get-the-3rd-free/_/N-2q0o',
    specifications: {
      Books: 'Selected titles only',
      'Free book': 'The lowest-priced item',
    },
    oldPrice: undefined,
    price: 1,
    expiryDate: new Date('2023-12-31'),
  },
  {
    id: 7,
    title: 'Free trial of Netflix for one month',
    description:
      'Netflix is offering a free trial of Netflix for one month. You can sign up for free here.',
    imgPaths: ['netflix1.jpg', 'netflix2.jpg'],
    numOfHotReactions: 11,
    numOfColdReactions: 0,
    postedDate: new Date('2023-11-28T20:00:00'),
    status: PostStatus.Available,
    owner: 'Bing',
    category: {
      id: 6,
      name: 'Dete 1',
      imgPaths: ['path11', 'path12'],
      parent: {
        id: 1,
        name: 'Kategorija 1',
        imgPaths: ['path1', 'path2'],
      },
    },
    restricted: false,

    reactions: [],
    comments: [],
    reports: [],
    saleType: SaleType.Online,
    store: 'Netflix',
    link: 'https://www.netflix.com/signup',
    specifications: {
      Trial: 'One month free',
      Plan: 'Any',
      Cancellation: 'Anytime',
    },
    oldPrice: undefined,
    price: 1,
    expiryDate: new Date('2023-12-31'),
  },
  {
    id: 8,
    title: 'Free shipping on orders over $50 at Walmart',
    description:
      'Walmart is offering free shipping on orders over $50. You can see the details here.',
    imgPaths: ['walmart1.jpg', 'walmart2.jpg'],
    numOfHotReactions: 4,
    numOfColdReactions: 6,
    postedDate: new Date('2023-11-27T09:00:00'),
    status: PostStatus.Available,
    owner: 'Bing',
    category: {
      id: 6,
      name: 'Dete 1',
      imgPaths: ['path11', 'path12'],
      parent: {
        id: 1,
        name: 'Kategorija 1',
        imgPaths: ['path1', 'path2'],
      },
    },
    restricted: false,

    reactions: [],
    comments: [],
    reports: [],
    saleType: SaleType.Online,
    store: 'Walmart',
    link: 'https://www.walmart.com/free-shipping',
    specifications: { Orders: 'Over $50', Shipping: 'Standard delivery' },
    oldPrice: undefined,
    price: 1,
    expiryDate: new Date('2023-12-31'),
  },
  {
    id: 9,
    title: 'Free haircut with any color service at Supercuts',
    description:
      'Supercuts is offering a free haircut with any color service. You can see the details here.',
    imgPaths: ['haircut1.jpg', 'haircut2.jpg'],
    numOfHotReactions: 3,
    numOfColdReactions: 7,
    postedDate: new Date('2023-11-26T13:00:00'),
    status: PostStatus.Available,
    owner: 'Bing',
    category: {
      id: 6,
      name: 'Dete 1',
      imgPaths: ['path11', 'path12'],
      parent: {
        id: 1,
        name: 'Kategorija 1',
        imgPaths: ['path1', 'path2'],
      },
    },
    restricted: false,

    reactions: [],
    comments: [],
    reports: [],
    saleType: SaleType.Offline,
    store: 'Supercuts',
    link: undefined,
    specifications: { Haircut: 'Any style', 'Color service': 'Any type' },
    oldPrice: undefined,
    price: 1,
    expiryDate: new Date('2023-12-31'),
  },
  {
    id: 10,
    title: 'Free entry to the zoo with any donation',
    description:
      'The Zoo is offering free entry with any donation. You can see the details here.',
    imgPaths: ['zoo1.jpg', 'zoo2.jpg'],
    numOfHotReactions: 12,
    numOfColdReactions: 2,
    postedDate: new Date('2023-11-25T15:00:00'),
    status: PostStatus.Available,
    owner: 'Bing',
    category: {
      id: 6,
      name: 'Dete 1',
      imgPaths: ['path11', 'path12'],
      parent: {
        id: 1,
        name: 'Kategorija 1',
        imgPaths: ['path1', 'path2'],
      },
    },
    restricted: false,

    reactions: [],
    comments: [],
    reports: [],
    saleType: SaleType.Offline,
    store: 'The Zoo',
    link: undefined,
    specifications: {
      Entry: 'One person per donation',
      Donation: 'Any amount',
    },
    oldPrice: undefined,
    price: 1,
    expiryDate: new Date('2023-12-31'),
  },
];
