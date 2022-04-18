import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { getUserLogout, LoggedInVar } from "../apollo";

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatar
      totalFollowing
      totalFollowers
    }
  }
`;

export const useMe = () => {
  const hasToken = useReactiveVar(LoggedInVar);
  const { data } = useQuery(ME_QUERY, { skip: !hasToken });
  useEffect(() => {
    if (data?.me === null) getUserLogout();
  }, [data]);
  return data;
};
