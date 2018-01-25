'use strict'
import { post } from '../../util/fetch'

export const startData = () => {
  return post('/api/start/data', {})
}
