import { gql } from '@shipfast/webapp-api-client/graphql';

export const authRequestPasswordResetConfirmMutation = gql(/* GraphQL */ `
  mutation authRequestPasswordResetConfirmMutation($input: PasswordResetConfirmationMutationInput!) {
    passwordResetConfirm(input: $input) {
      ok
    }
  }
`);
