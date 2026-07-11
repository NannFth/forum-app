import React from 'react';
import { render, screen } from '@testing-library/react';
import CommentItem from './CommentItem';

/**
 * test scenario for CommentItem component
 *
 * - CommentItem component
 *   - should render the comment content
 *   - should render the owner's name and avatar
 *   - should render the "posted at" info derived from createdAt
 */
describe('CommentItem component', () => {
  const commentProps = {
    id: 'comment-1',
    content: '<p>Ini adalah komentar</p>',
    createdAt: new Date().toISOString(),
    owner: {
      id: 'user-1',
      name: 'Budi Santoso',
      avatar: 'https://example.com/avatar.png',
    },
  };

  it('should render the comment content', () => {
    render(<CommentItem {...commentProps} />);

    expect(screen.getByText('Ini adalah komentar')).toBeInTheDocument();
  });

  it("should render the owner's name and avatar", () => {
    render(<CommentItem {...commentProps} />);

    expect(screen.getByText('Budi Santoso')).toBeInTheDocument();
    expect(screen.getByAltText('Budi Santoso')).toHaveAttribute('src', commentProps.owner.avatar);
  });

  it('should render the "posted at" info derived from createdAt', () => {
    render(<CommentItem {...commentProps} />);

    expect(screen.getByText(/just now|seconds ago/)).toBeInTheDocument();
  });
});
