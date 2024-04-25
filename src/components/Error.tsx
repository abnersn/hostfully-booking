import type { ReactElement } from 'react'
import { FaArrowRotateRight } from 'react-icons/fa6'
import { Container, Header, Main, Title } from './layout'

export default function (): ReactElement {
  const handleRefreshClick = () => {
    location.reload()
  }
  return (
    <Container>
      <Header>
        <Title>Sorry, an error occurred</Title>
      </Header>
      <Main>
        <div className='flex w-full flex-col gap-2 p-4 text-lg text-white'>
          We're working to fix it asap!
          <button
            onClick={handleRefreshClick}
            className='mr-auto inline-flex items-center gap-1 rounded border border-white px-2 py-1 text-sm text-white hover:border-blue-200 hover:text-blue-200'
          >
            <FaArrowRotateRight /> Try again
          </button>
        </div>
      </Main>
    </Container>
  )
}
