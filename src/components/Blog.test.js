import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('<Blog />', () => {
  let blog = {
    title: 'Test blog',
    author: 'Test Dummy',
    url: 'test.com',
    likes: 10
  }
  test('it displays only title', () => {
    const mockIncrementLikes = jest.fn()
    const mockRemoveBlog = jest.fn()

    const container = render(<Blog
      blog={blog}
      incrementLikes={mockIncrementLikes}
      removeBlog={mockRemoveBlog}
      username='dummy'
    />).container
    const div = container.querySelector('.detailsView')
    expect(div).toHaveStyle('display: none')
  })
  test('clicking show details makes details view visible', async () => {
    const mockIncrementLikes = jest.fn()
    const mockRemoveBlog = jest.fn()

    const container = render(<Blog
      blog={blog}
      incrementLikes={mockIncrementLikes}
      removeBlog={mockRemoveBlog}
      username='dummy'
    />).container
    const user = userEvent.setup()
    const showDetailsButton = screen.getByText('Show details')
    await user.click(showDetailsButton)
    const div = container.querySelector('.detailsView')
    console.log(div)
    expect(div).not.toHaveStyle('display: none')
  })
  test('clicking like twice calls event handler twice', async () => {
    const mockIncrementLikes = jest.fn()
    const mockRemoveBlog = jest.fn()

    const container = render(<Blog
      blog={blog}
      incrementLikes={mockIncrementLikes}
      removeBlog={mockRemoveBlog}
      username='dummy'
    />).container
    const user = userEvent.setup()
    const showDetailsButton = screen.getByText('Show details')
    await user.click(showDetailsButton)
    const likeButton = container.querySelector('.likeBtn')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockIncrementLikes.mock.calls).toHaveLength(2)
  })
})
