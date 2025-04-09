import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

test('show content when button is clicked', () => {
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

  const div = container.querySelector('.visible')

  expect(div).toHaveTextContent('https://fullstackopen.com')
  expect(div).toHaveTextContent('5')
})

test('clicking the button twice calls event handler twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Ariel Sibaja',
    url: 'https://fullstackopen.com',
    likes: 5,
    user: {
      id: '643f1a0b2c9e3d4f8c5b6a7e',
    }
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} addLikes={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
