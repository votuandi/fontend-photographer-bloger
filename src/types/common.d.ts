export type SortSettingsType = {
  sort: SortType
  sortOrder: SortOderType
}

export type ServiceSortSettingsType = {
  sort: ServiceSortType
  sortOrder: SortOderType
}

export type CouponSortSettingsType = {
  sort: CouponSortType
  sortOrder: SortOderType
}

export type CouponSortType = 'type' | ''

export type ServiceSortType = 'categories' | 'type' | ''

export type SortType = 'price' | 'categories' | 'type' | ''

export type SortOderType = 'ASC' | 'DESC'

export type FilterType = 'all' | 'product' | 'gift'

export type RedeemedCouponFilterType = 'all' | 'active' | 'past'

export type ServiceTypeType = '' | 'car_cleaning' | 'commerce_cleaning' | 'home_cleaning'
