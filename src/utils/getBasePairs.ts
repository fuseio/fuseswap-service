import flatMap from 'lodash.flatmap'
import getBases from './getBases'
import { Token } from '@fuseio/fuse-swap-sdk'

export default function getBasePairs(): [Token, Token][] {
  return flatMap(getBases(), (base): [Token, Token][] =>
    getBases().map((otherBase) => [base, otherBase])
  ).filter(([t0, t1]) => t0.address !== t1.address)
}
