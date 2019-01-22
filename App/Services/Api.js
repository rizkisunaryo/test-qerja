import { BASE_URL } from '../Config/Api'
import { generateUrlParams } from '../Services/Utils'

export const apiGetNewsList = (keyword, page) =>
  fetch(`${BASE_URL}${generateUrlParams({ q: keyword, page })}`)
    .then(resp => resp.json())
    .catch(err => console.error('Api:: apiGetNewsList: ', err))
