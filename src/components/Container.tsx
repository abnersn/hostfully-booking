import type { PropsWithChildren, ReactElement } from 'react'
export default function Container(props: PropsWithChildren): ReactElement {
  return <div className='grid place-items-center pt-4'>{props.children}</div>
}
