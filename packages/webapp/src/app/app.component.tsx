import { DemoItem, DemoItems, PrivacyPolicy, TermsAndConditions } from '@shipfast/webapp-contentful/routes';
import { DEFAULT_LOCALE, translationMessages } from '@shipfast/webapp-core/config/i18n';
import { CrudDemoItem } from '@shipfast/webapp-crud-demo/routes';
import { Documents } from '@shipfast/webapp-documents/routes';
import { ActiveSubscriptionContext } from '@shipfast/webapp-finances/components/activeSubscriptionContext';
import {
  CancelSubscription,
  CurrentSubscriptionContent,
  EditPaymentMethod,
  EditSubscription,
  PaymentConfirm,
  PaymentMethodContent,
  Subscriptions,
  TransactionHistory,
  TransactionsHistoryContent,
} from '@shipfast/webapp-finances/routes';
import { SaasIdeas, TextGen, DocChat } from '@shipfast/webapp-generative-ai/routes';
import { IntlProvider } from 'react-intl';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { Role } from '../modules/auth/auth.types';
import { Admin } from '../routes/admin';
import { PasswordReset } from '../routes/auth/passwordReset';
import ValidateOtp from '../routes/auth/validateOtp';
import { AnonymousRoute, AuthRoute } from '../shared/components/routes';
import { ConfirmEmail, Home, Login, Logout, NotFound, Profile, Signup } from './asyncComponents';
import { LANG_PREFIX, RoutesConfig } from './config/routes';
import { ValidRoutesProviders } from './providers';

export const App = () => {
  const { pathname, search } = useLocation();

  return (
    <Routes>
      <Route element={<ValidRoutesProviders />}>
        <Route path={LANG_PREFIX}>
          <Route path={RoutesConfig.logout} element={<Logout />} />
        </Route>
        <Route path={LANG_PREFIX} element={<AnonymousRoute />}>
          <Route path={RoutesConfig.signup} element={<Signup />} />
          <Route path={RoutesConfig.login} element={<Login />} />
          <Route path={RoutesConfig.validateOtp} element={<ValidateOtp />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path={LANG_PREFIX} element={<AuthRoute />}>
          <Route index element={<Home />} />
          <Route path={RoutesConfig.profile} element={<Profile />} />
          <Route path={RoutesConfig.demoItems} element={<DemoItems />} />
          <Route path={RoutesConfig.demoItem} element={<DemoItem routesConfig={RoutesConfig} />} />
          <Route path={RoutesConfig.crudDemoItem.index} element={<CrudDemoItem routesConfig={RoutesConfig} />} />
          <Route element={<ActiveSubscriptionContext />}>
            <Route element={<Subscriptions />}>
              <Route index path={RoutesConfig.subscriptions.index} element={<CurrentSubscriptionContent />} />
              <Route path={RoutesConfig.subscriptions.paymentMethods.index} element={<PaymentMethodContent />} />
              <Route
                path={RoutesConfig.subscriptions.transactionHistory.index}
                element={<TransactionsHistoryContent />}
              />
            </Route>
            <Route path={RoutesConfig.subscriptions.currentSubscription.edit} element={<EditSubscription />} />
            <Route path={RoutesConfig.subscriptions.currentSubscription.cancel} element={<CancelSubscription />} />
            <Route path={RoutesConfig.subscriptions.paymentMethods.edit} element={<EditPaymentMethod />} />
          </Route>
          <Route path={RoutesConfig.finances.paymentConfirm} element={<PaymentConfirm />} />
          <Route path={RoutesConfig.subscriptions.transactionHistory.history} element={<TransactionHistory />} />
          <Route path={RoutesConfig.documents} element={<Documents />} />
          <Route path={RoutesConfig.saasIdeas} element={<SaasIdeas />} />
          <Route path={RoutesConfig.docChat} element={<DocChat />} />
          <Route path={RoutesConfig.textGen} element={<TextGen />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path={LANG_PREFIX} element={<AuthRoute allowedRoles={Role.ADMIN} />}>
          <Route path={RoutesConfig.admin} element={<Admin />} />
        </Route>

        <Route path={LANG_PREFIX}>
          <Route path={RoutesConfig.confirmEmail} element={<ConfirmEmail />} />
          <Route path={RoutesConfig.privacyPolicy} element={<PrivacyPolicy />} />
          <Route path={RoutesConfig.termsAndConditions} element={<TermsAndConditions />} />
          <Route path={RoutesConfig.passwordReset.index} element={<PasswordReset />} />
        </Route>

        {/* <-- INJECT ROUTE --> */}

        <Route
          path="*"
          element={
            <IntlProvider key={DEFAULT_LOCALE} locale={DEFAULT_LOCALE} messages={translationMessages[DEFAULT_LOCALE]}>
              <NotFound />
            </IntlProvider>
          }
        />
      </Route>

      <Route path="/" element={<Navigate to={`/${DEFAULT_LOCALE}${pathname}${search}`} />} />
    </Routes>
  );
};

export default App;
