import type { ReactElement } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { Container, Header, Main, Title } from './layout'

function Skeleton(): ReactElement {
  return (
    <div className='grid h-80 w-full items-center justify-center rounded-lg bg-blue-400 text-3xl text-white'>
      <FaSpinner className='animate-spin' />
    </div>
  )
}

export default function (): ReactElement {
  return (
    <Container>
      <Header>
        <Title>Loading accomodations...</Title>
      </Header>
      <Main>
        <ul className='grid w-full grid-cols-auto-fill-400 grid-rows-2 gap-4 p-4'>
          {new Array(6).fill(null).map((_, idx) => (
            <Skeleton key={idx} />
          ))}
        </ul>
      </Main>
    </Container>
  )
}
