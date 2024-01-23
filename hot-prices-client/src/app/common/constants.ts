import { environment } from "src/environments/environment";

export const YES_NO_OPTIONS = {
  YES: { label: 'Yes', value: true},
  NO: { label: 'No', value: false },
};

export const KEYS = {
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
  OFFER:{
    IMAGE: '../../../assets/default-product.png',
  },
  EDITORS_NUM_OF_CHARS: 1000,
}

export const PAGE = {
  INITIAL_INDEX: 0,
  SIZE: 5,
}

export const NOT_FOUND = {
  OFFER_ID: -1,
}

export const IMAGES_URL = `${environment.api}/file/image`

export const LIMITS = {
  OFFER:{
    IMAGES: 10,
    SPECIFICATIONS: 3,
    DESCRIPTION_CHARS: 1000,
    MIN_PRICE: 0,
    MAX_PRICE: 1000000,
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