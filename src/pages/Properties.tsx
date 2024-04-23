import type { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { selectProperties } from 'redux-store/slices/properties'

export default function Properties(): ReactElement {
  const properties = useSelector(selectProperties)
  return (
    <ul>
      {properties.map(p => (
        <li key={p.id}>
          <article>
            <header>
              <h3>{p.title}</h3>
              <address>
                {p.location} {p.country}
              </address>
            </header>
          </article>
        </li>
      ))}
    </ul>
  )
}
