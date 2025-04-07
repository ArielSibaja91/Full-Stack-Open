import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Ariel Sibaja',
    url: 'https://fullstackopen.com',
    likes: 5,
    user: {
      id: '643f1a0b2c9e3d4f8c5b6a7e',
    }
  }

  const { container } = render(<Blog blog={blog} />)

  screen.debug()

  const div = container.querySelector('.hidden')

  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})
