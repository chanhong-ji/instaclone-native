import { gql } from "@apollo/client";

export const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on Photo {
    id
    file
    caption
    likes
    commentCount
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    payload
    isMine
    user {
      id
      username
    }
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    username
    avatar
    isMe
    isFollowing
  }
`;

export const FEED_PHOTO_FRAGMENT = gql`
  fragment FeedPhotoFragment on Photo {
    ...PhotoFragment
    comments {
      ...CommentFragment
    }
    isMine
    isLiked
    createdAt
    updatedAt
    user {
      id
      username
      avatar
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;
