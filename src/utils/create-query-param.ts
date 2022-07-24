import { keys } from 'lodash'

interface QueryParams {
  [key: string]: string | number | boolean | undefined
}

export const createQueryParam = (param: QueryParams) => {
  const [key] = keys(param)

  const value = param[key]

  if (!value) {
    return ''
  }

  return `&${key}=${encodeURIComponent(value)}`
}
