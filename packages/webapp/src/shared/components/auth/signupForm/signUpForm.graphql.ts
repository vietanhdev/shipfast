import { gql } from '@shipfast/webapp-api-client/graphql';

export const authSingupMutation = gql(/* GraphQL */ `
  mutation authSignupMutation($input: SingUpMutationInput!) {
    signUp(input: $input) {
      access
      refresh
    }
  }
`);
