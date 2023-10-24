import { ApolloProvider as Provider } from '@apollo/client';
import { apolloClient, apolloEmitter } from '@shipfast/webapp-api-client';
import { useLocales } from '@shipfast/webapp-core/hooks';
import { ToastEmitterActions } from '@shipfast/webapp-core/toast/toastProvider/toastProvider.types';
import { useToast } from '@shipfast/webapp-core/toast/useToast';
import { ReactNode, useEffect } from 'react';

export const ApolloProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const {
    locales: { language },
  } = useLocales();

  useEffect(() => {
    apolloEmitter.addEventListener(ToastEmitterActions.ADD_TOAST, toast);

    return () => {
      apolloEmitter.removeEventListener(ToastEmitterActions.ADD_TOAST, toast);
    };
  }, [toast]);

  useEffect(() => {
    localStorage.setItem('LOCALES_LANGUAGE', language || '');
  }, [language]);

  return <Provider client={apolloClient}>{children}</Provider>;
};
