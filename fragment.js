import { gql } from "@apollo/client";

export const PHOTO_FRAMENT = gql`
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
      username
    }
  }
`;
