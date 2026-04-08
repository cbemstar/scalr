declare module "@mael-667/liquid-glass-react" {
  import type { ReactNode } from "react"

  export function LiquidGlassProvider(props: {
    children: ReactNode
  }): React.JSX.Element

  type ElementTag = keyof React.JSX.IntrinsicElements

  export function LiquidGlass(props: {
    as?: ElementTag
    children?: ReactNode
    className?: string
    hoverable?: boolean
    dynamic?: boolean
    large?: boolean
  }): React.JSX.Element

  export function Tint(props: {
    as?: ElementTag
    children?: ReactNode
    hue: string
  }): React.JSX.Element
}
