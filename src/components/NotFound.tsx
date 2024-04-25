import { ReactElement } from 'react'
import LinkButton from './LinkButton'
import { Container, Header, Main, Title } from './layout'

export default function NotFound(): ReactElement {
  return (
    <Container>
      <Header>
        <Title>Could not find what you're looking for.</Title>
      </Header>
      <Main>
        <div className='h-44 p-4 text-white'>
          <p className='mb-2'>
            Go back to our main page to check accomodation options!
          </p>
          <LinkButton variant='white' to='/' label='Check other options' />
        </div>
      </Main>
    </Container>
  )
}
