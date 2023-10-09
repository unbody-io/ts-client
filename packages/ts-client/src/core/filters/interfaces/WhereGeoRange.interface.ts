export interface IWhereGeoRange {
  geoCoordinates: {
    latitude: number
    longitude: number
  }
  distance: { max: number }
}
