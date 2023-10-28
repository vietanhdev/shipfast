import { useMutation } from '@apollo/client';
import { useApiForm } from '@shipfast/webapp-api-client/hooks';
import { Button } from '@shipfast/webapp-core/components/buttons';
import { Form, FormControl, FormField, FormItem, Input } from '@shipfast/webapp-core/components/forms';
import { PageHeadline } from '@shipfast/webapp-core/components/pageHeadline';
import { Skeleton } from '@shipfast/webapp-core/components/skeleton';
import { useToast } from '@shipfast/webapp-core/toast/useToast';
import { useEffect, useMemo, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';
import Typewriter from 'typewriter-effect/dist/core';

import { generateSaasIdeasMutation } from './saasIdeas.graphql';

const MAX_KEYWORDS_LENGTH = 200;

export const SaasIdeas = () => {
  const intl = useIntl();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();
  const {
    form: {
      register,
      formState: { errors },
      handleSubmit,
    },
    form,
  } = useApiForm({
    defaultValues: {
      keywords: '',
    },
  });

  const [commitGenerateSaasIdeasMutation, { data, loading }] = useMutation(generateSaasIdeasMutation, {
    onError: (error) => toast({ description: error.message, variant: 'destructive' }),
  });

  const handleFormSubmit = handleSubmit(async (data) => {
    await commitGenerateSaasIdeasMutation({
      variables: {
        input: {
          keywords: data.keywords.split(',').map((keyword) => keyword.trim()),
        },
      },
    });
    return;
  });

  const placeholders = useMemo(
    () => [
      intl.formatMessage({
        defaultMessage: 'Recruitment software, performance management...',
        id: 'SaaS ideas form / Keywords recruitment and performance placeholder ',
      }),
      intl.formatMessage({
        defaultMessage: 'Task management, project management...',
        id: 'SaaS ideas form / Keywords task and project management placeholder',
      }),
      intl.formatMessage({
        defaultMessage: 'Sales automation, inventory management...',
        id: 'SaaS ideas form / Keywords sales and inventory placeholder',
      }),
      intl.formatMessage({
        defaultMessage: 'Time tracking, accounting and finance...',
        id: 'SaaS ideas form / Keywords time tracking and finance placeholder',
      }),
    ],
    [intl]
  );

  const handleCreateTextNode = (character: string) => {
    if (inputRef.current) {
      inputRef.current.placeholder = inputRef.current.placeholder + character;
    }

    return null;
  };

  const handleRemoveNode = () => {
    if (inputRef.current && inputRef.current.placeholder) {
      inputRef.current.placeholder = inputRef.current.placeholder.slice(0, -1);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      const instance = new Typewriter(inputRef.current, {
        strings: placeholders,
        autoStart: true,
        loop: true,
        onCreateTextNode: handleCreateTextNode,
        onRemoveNode: handleRemoveNode,
      });
      return () => {
        instance.stop();
      };
    }
    return () => {
      return null;
    };
  }, [placeholders, inputRef]);

  const registerKeywords = register('keywords', {
    maxLength: {
      value: MAX_KEYWORDS_LENGTH,
      message: intl.formatMessage({
        defaultMessage: 'Keywords is too long',
        id: 'SaaS ideas form / Keywords max length error',
      }),
    },
    required: {
      value: true,
      message: intl.formatMessage({
        defaultMessage: 'Keywords is required',
        id: 'SaaS ideas form / Keywords required',
      }),
    },
  });
  return (
    <div className="flex-1 space-y-4 mt-4">
      <Helmet
        title={intl.formatMessage({
          defaultMessage: 'SaaS Ideas',
          id: 'SaaS Ideas / page title',
        })}
      />

      <PageHeadline
        header={<FormattedMessage defaultMessage="Business Ideas" id="SaaS ideas / title" />}
        className="px-8"
        subheader={
          <FormattedMessage
            defaultMessage="Generate your next business ideas based on keywords"
            id="SaaS ideas / description"
          />
        }
      />

      <div className="px-8">
        <Form {...form} >
          <form onSubmit={handleFormSubmit} noValidate={true}>
            <FormField
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      {...registerKeywords}
                      label={intl.formatMessage({
                        defaultMessage: 'Keywords:',
                        id: 'SaaS ideas Form / Keywords label',
                      })}
                      error={errors.keywords?.message}
                      ref={(e) => {
                        registerKeywords.ref(e);
                        inputRef.current = e;
                      }}
                      maxLength={MAX_KEYWORDS_LENGTH}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button className="mt-5" type="submit" disabled={loading}>
              <FormattedMessage defaultMessage="Generate ideas" id="SaaS ideas form / Submit button" />
            </Button>
          </form>
        </Form>

        {data?.generateSaasIdeas?.ideas && (
          <div className="mt-5">
            <h2 className="text-md font-bold">
              Here are your ideas based on keywords:  <span className="text-primary">{form.getValues().keywords}</span>
            </h2>
          </div>
        )}

        <ul className="max-w-xs md:max-w-md mt-4 block">
          {loading ? (
            <li className="[&>*]:mt-5">
              <Skeleton className="h-4 w-64 md:w-80" />
              <Skeleton className="h-4 w-72 md:w-96" />
              <Skeleton className="h-4 w-64 md:w-80" />
              <Skeleton className="h-4 w-60 md:w-72" />
            </li>
          ) : (
            data?.generateSaasIdeas?.ideas?.map((idea, index) => (
              <li className="mb-2" key={index}>
                {idea}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};
