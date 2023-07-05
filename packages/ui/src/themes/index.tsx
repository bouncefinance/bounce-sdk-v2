import { ThemeProvider } from '@mui/material'
import { FC } from 'react'
import { useMuiThemes } from './context'

export * from './context'
export * from './options/color'
export * from './components'

export const withBounceTheme = <T,>(Children: FC<T>) => {
  return (props: T) => {
    const { themes } = useMuiThemes()
    return (
      <ThemeProvider theme={themes}>
        {/* @ts-ignore */}
        <Children {...props} />
      </ThemeProvider>
    )
  }
}
