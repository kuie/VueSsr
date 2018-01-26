'use strict'
import path from 'path'
import { post } from '../../util/fetch'

export const startData = () => {
  return post(path.join('/api', 'start', 'data'), {})
}
