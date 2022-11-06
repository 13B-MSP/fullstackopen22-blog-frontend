import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import NewBlogForm from './NewBlogForm'

describe('<NewBlogForm />', () => {
  test('event handlers called when new blog is created', async () => {
    const mockCreateBlog = jest.fn()

    render(<NewBlogForm createBlog={mockCreateBlog} />)

    const user = userEvent.setup()

    const titleInput = screen.getByPlaceholderText('provide title')
    await user.type(titleInput, 'testTitle')
    const authorInput = screen.getByPlaceholderText('provide author')
    await user.type(authorInput, 'testAuthor')
    const urlInput = screen.getByPlaceholderText('provide url')
    await user.type(urlInput, 'testUrl')

    const createButton = screen.getByText('create')
    await user.click(createButton)

    expect(mockCreateBlog.mock.calls).toHaveLength(1)
    expect(mockCreateBlog.mock.calls[0][0].title).toBe('testTitle')
    expect(mockCreateBlog.mock.calls[0][0].author).toBe('testAuthor')
    expect(mockCreateBlog.mock.calls[0][0].url).toBe('testUrl')
  })
})