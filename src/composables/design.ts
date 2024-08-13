import variables from '@/styles/variables.module.scss'

export function useDesign() {
  const getPrefixCls = (scope: string) => {
    return `${variables.prefixCls}-${scope}`
  }

  return {
    variables,
    getPrefixCls,
  }
}
