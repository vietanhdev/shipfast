import { gql } from '@shipfast/webapp-api-client/graphql';

export const authRequestPasswordResetMutation = gql(/* GraphQL */ `
  mutation authRequestPasswordResetMutation($input: PasswordResetMutationInput!) {
    passwordReset(input: $input) {
      ok
    }
  }
`);
