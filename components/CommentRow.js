import { useNavigation } from "@react-navigation/native";
import propTypes from "prop-types";
import styled from "styled-components/native";
import { Text, Alert } from "react-native";
import { gql, useMutation } from "@apollo/client";

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($commentId: Int!) {
    deleteComment(commentId: $commentId) {
      ok
      error
    }
  }
`;

const Wrapper = styled.View`
  width: 100%;
  flex-direction: row;
  padding: 10px 15px;
`;

const Avatar = styled.Image`
  width: 35px;
  height: 35px;
  border-radius: 17.5px;
  margin-right: 8px;
`;
const Column = styled.View`
  flex-direction: row;
`;
const Username = styled.Text`
  font-weight: 600;
  margin-right: 4px;
  color: ${(props) => props.theme.color.text};
`;
const Payload = styled.Text`
  color: ${(props) => props.theme.color.text};
`;
const DeleteBtn = styled.TouchableOpacity`
  margin-left: 10px;
  margin-top: 4px;
  border-color: grey;
`;

function CommentRow({ id, isMine, payload, user }) {
  const navigation = useNavigation();
  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: { commentId: +id },
    update: (cache, { data }) => {
      const {
        deleteComment: { ok, error },
      } = data;
      if (!ok) return Alert.alert("Fail", String(error));
      cache.evict({ id: `Comment:${id}` });
    },
  });
  return (
    <Wrapper>
      <Avatar source={{ uri: user.avatar }} />
      <Column>
        <Username
          onPress={() => navigation.navigate("Profile", { id: user.id })}
        >
          {user.username}
        </Username>
        <Payload>{payload}</Payload>
        {isMine && (
          <DeleteBtn onPress={deleteComment}>
            <Text style={{ color: "grey", fontSize: 10 }}>Delete</Text>
          </DeleteBtn>
        )}
      </Column>
      <Column></Column>
    </Wrapper>
  );
}

export default CommentRow;

CommentRow.proptypes = {
  id: propTypes.number.isRequired,
  payload: propTypes.string.isRequired,
  isMine: propTypes.bool.isRequired,
  user: propTypes.shape({
    id: propTypes.string,
    username: propTypes.string.isRequired,
    avatar: propTypes.string.isRequired,
    isMe: propTypes.bool.isRequired,
    isFollowing: propTypes.bool.isRequired,
  }),
};
