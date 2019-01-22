export function generateUrlParams (paramValueObject) {
  return Object.keys(paramValueObject).reduce(
    (acc, cur) => paramValueObject[cur] ? acc + `&${cur}=${paramValueObject[cur]}` : acc,
    ''
  )
}
