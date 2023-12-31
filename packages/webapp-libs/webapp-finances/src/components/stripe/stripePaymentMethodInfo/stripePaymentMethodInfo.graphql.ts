import { gql } from '@shipfast/webapp-api-client/graphql';

export const STRIPE_ALL_PAYMENTS_METHODS_FRAGMENT = gql(/* GraphQL */ `
  fragment stripePaymentMethodFragment on StripePaymentMethodType {
    id
    pk
    type
    card
    billingDetails
  }
`);
