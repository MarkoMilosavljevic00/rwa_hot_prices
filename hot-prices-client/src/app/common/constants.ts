import { environment } from "src/environments/environment";

export const YES_NO_OPTIONS = {
  YES: { label: 'Yes', value: true},
  NO: { label: 'No', value: false },
};


export const DEFAULT = {
  OFFER:{
    IMAGE: '../../../assets/default-product.png',
  }
}

export const IMAGES_URL = `${environment.api}/file/image`

export const LIMITS = {
  OFFER:{
    IMAGES: 10,
    SPECIFICATIONS: 3,
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