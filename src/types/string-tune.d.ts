import "react"

/**
 * StringTune (@fiddle-digital/string-tune) uses declarative `string` / `string-*` attributes.
 * @see https://tune.fiddle.digital/docs/quick-start
 */
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- matches React's HTMLAttributes<T>
  interface HTMLAttributes<T> {
    string?: string
    "string-id"?: string
    "string-split"?: string
    "string-strength"?: string | number
    "string-radius"?: string | number
    "string-parallax"?: string | number
    "string-parallax-bias"?: string | number
    "string-key"?: string
    "string-enter-el"?: string
    "string-enter-vp"?: string
    "string-exit-el"?: string
    "string-exit-vp"?: string
    "string-offset-top"?: string
    "string-offset-bottom"?: string
    "string-easing"?: string
  }
}
