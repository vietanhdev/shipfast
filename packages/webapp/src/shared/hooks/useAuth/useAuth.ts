import { CurrentUserType, getFragmentData } from '@shipfast/webapp-api-client/graphql';
import { commonQueryCurrentUserFragment, useCommonQuery } from '@shipfast/webapp-api-client/providers';
import { useGenerateLocalePath } from '@shipfast/webapp-core/hooks';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { RoutesConfig } from '../../../app/config/routes';

export const useAuth = () => {
  const navigate = useNavigate();
  const generateLocalePath = useGenerateLocalePath();
  const { data } = useCommonQuery();
  const profile = getFragmentData(commonQueryCurrentUserFragment, data?.currentUser);

  const isLoggedIn = !!profile;

  const logout = useCallback(() => {
    navigate(generateLocalePath(RoutesConfig.logout));
  }, [navigate, generateLocalePath]);

  return {
    isLoggedIn,
    currentUser: profile as CurrentUserType | null,
    logout,
  };
};
