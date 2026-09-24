import compact from 'lodash/compact'

export const cn = (...classNames: Array<string | false | null | undefined>) =>
  compact(classNames).join(' ')
