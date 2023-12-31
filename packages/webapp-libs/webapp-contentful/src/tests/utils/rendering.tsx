import * as apiUtils from '@shipfast/webapp-api-client/tests/utils/rendering';
import * as corePath from '@shipfast/webapp-core/utils/path';
import { StoryContext } from '@storybook/react';
import { RenderOptions, render, renderHook } from '@testing-library/react';
import { ComponentClass, ComponentType, FC, ReactElement } from 'react';
import { MemoryRouterProps, generatePath } from 'react-router';

export type WrapperProps = apiUtils.WrapperProps;

export function getWrapper(
  WrapperComponent: ComponentClass<apiUtils.ApiTestProvidersProps> | FC<apiUtils.ApiTestProvidersProps>,
  wrapperProps: WrapperProps,
  storyContext?: StoryContext
): {
  wrapper: ComponentType<WrapperProps>;
  waitForApolloMocks: (mockIndex?: number) => Promise<void>;
} {
  return apiUtils.getWrapper(apiUtils.ApiTestProviders, wrapperProps, storyContext);
}

export type CustomRenderOptions = RenderOptions & WrapperProps;

function customRender(ui: ReactElement, options: CustomRenderOptions = {}) {
  const { wrapper, waitForApolloMocks } = getWrapper(apiUtils.ApiTestProviders, options);

  return {
    ...render(ui, {
      ...options,
      wrapper,
    }),
    waitForApolloMocks,
  };
}

function customRenderHook<Result, Props>(hook: (initialProps: Props) => Result, options: CustomRenderOptions = {}) {
  const { wrapper, waitForApolloMocks } = getWrapper(apiUtils.ApiTestProviders, options);

  return {
    ...renderHook(hook, {
      ...options,
      wrapper,
    }),
    waitForApolloMocks,
  };
}

export { customRender as render, customRenderHook as renderHook };

export const createMockRouterProps = (pathName: string, params?: Record<string, any>): MemoryRouterProps => {
  return {
    initialEntries: [
      generatePath(corePath.getLocalePath(pathName), {
        lang: 'en',
        ...(params ?? {}),
      }),
    ],
  };
};
