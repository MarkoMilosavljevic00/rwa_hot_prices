import { environment } from "src/environments/environment";

export const YES_NO_OPTIONS = {
  YES: { label: 'Yes', value: true},
  NO: { label: 'No', value: false },
};

export const KEYS = {
  USER: 'user',
  TOKEN: 'access_token',
  TITLE: 'title',
  OFFER: {
    STORE: 'store',
    LOCATION: 'location',
    CATEGORY: 'category',
    TITLE: 'title',
    DESCRIPTION: 'description',
    PRICE: 'price',
    SALE_TYPE: 'saleType',
    DISCOUNT: 'discount',
    DISCOUNT_PRICE: 'discountPrice',
    IMAGES: 'images',
    SPECIFICATIONS: 'specifications'
  }
}

export const STYLE = {
  FULL_WIDTH: { width: '100%' },
}


export const DEFAULT = {
  POST:{
    IMAGE: '../../../assets/default-product.png',
  },
  EDITORS_NUM_OF_CHARS: 1000,
  USER: {
    IMAGE: '../../../assets/default-user.jpg',
    ID: 5,
  },
}

export const PAGE = {
  INITIAL_INDEX: 0,
  SIZE: 5,
}

export const COMMENTS = {
  INITIAL_SIZE: 3,
}

export const NOT_FOUND = {
  OFFER_ID: -1,
}

export const IMAGES_URL = `${environment.api}/file/image`
export const UPLOAD_IMAGES_URL = environment.api + '/file/uploadImages/'

export const LIMITS = {
  OFFER:{
    IMAGES: 7,
    SPECIFICATIONS: 3,
    DESCRIPTION_CHARS: 1000,
    MIN_PRICE: 0,
    MAX_PRICE: 1000000,
  },
  COUPON: {
    IMAGES: 3,
    SPECIFICATIONS: 3,
    DESCRIPTION_CHARS: 1000,
  },
  USER: {
    USERNAME_MIN_LENGTH: 3,
    PASSWORD_MIN_LENGTH: 5,
  }
}

export const TIME = {
  MILISECONDS: {
    ONE_SECOND: 1000,
    ONE_MINUTE: 60000,
    ONE_HOUR: 3600000,
    ONE_DAY: 86400000,
  },
}