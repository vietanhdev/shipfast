import { Alert, AlertDescription, AlertTitle } from '@sb/webapp-core/components/alert';
import { Link } from '@sb/webapp-core/components/buttons';
import { buttonVariants } from '@sb/webapp-core/components/buttons/button/button.styles';
import { Separator } from '@sb/webapp-core/components/separator';
import { useGenerateLocalePath, useMediaQuery } from '@sb/webapp-core/hooks';
import { cn } from '@sb/webapp-core/lib/utils';
import { media } from '@sb/webapp-core/theme';
import { X } from 'lucide-react';
import { HTMLAttributes, useCallback, useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { RoutesConfig } from '../../../../app/config/routes';
import { Role } from '../../../../modules/auth/auth.types';
import { RoleAccess } from '../../roleAccess';
import { LayoutContext } from '../layout.context';

export const Sidebar = (props: HTMLAttributes<HTMLDivElement>) => {
  const intl = useIntl();
  const generateLocalePath = useGenerateLocalePath();
  const { setSideMenuOpen, isSideMenuOpen } = useContext(LayoutContext);
  const { matches: isDesktop } = useMediaQuery({ above: media.Breakpoint.TABLET });

  const closeSidebar = useCallback(() => setSideMenuOpen(false), [setSideMenuOpen]);

  const menuItemClassName = ({ isActive = false }) =>
    cn(buttonVariants({ variant: 'ghost' }), 'justify-start', {
      'bg-accent text-accent-foreground': isActive,
    });

  return (
    <>
      <div
        className={cn('pointer-events-none fixed inset-0 z-20 bg-black/80 opacity-0 transition-opacity lg:hidden', {
          'pointer-events-auto opacity-100': isSideMenuOpen,
        })}
        onClick={closeSidebar}
      ></div>
      <div
        className={cn(
          'fixed left-80 top-6 z-20 cursor-pointer text-white opacity-0 transition-opacity lg:pointer-events-none lg:hidden',
          {
            'block opacity-100 lg:hidden': isSideMenuOpen,
          }
        )}
        role="button"
        onClick={closeSidebar}
        aria-label={intl.formatMessage({
          defaultMessage: 'Close menu',
          id: 'Home / close sidebar icon label',
        })}
      >
        <X size={24} />
      </div>
      <div
        {...props}
        className={cn(
          'fixed inset-y-0 -left-72 z-20 flex w-72 border-r bg-background transition-transform duration-300 lg:left-0 lg:transition-none',
          {
            'translate-x-72 lg:translate-x-0': isSideMenuOpen,
          },
          props.className
        )}
      >
        <div className="flex grow flex-col gap-y-3">
          <div className="flex grow flex-col gap-y-7 overflow-auto px-6">
            <div className="flex h-16 items-center pt-4">
              <Link
                to={generateLocalePath(RoutesConfig.home)}
                aria-label={intl.formatMessage({
                  id: 'Header / Home link aria label',
                  defaultMessage: 'Go back home',
                })}
              >
                <img
                  alt="Logo"
                  src="/logo.png"
                  className="h-12"
                />
                <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white ml-2">
                  AICurious<span className="text-gray-500 ml-1">Studio</span><br></br>
                </span>
              </Link>
            </div>
            <nav className="-mx-2 flex grow flex-col gap-y-1">
              <RoleAccess>
                <Link
                  className={menuItemClassName}
                  to={generateLocalePath(RoutesConfig.home)}
                  onClick={closeSidebar}
                  navLink
                >
                  <svg className="w-5 h-5 text-gray-600 mr-3 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  <FormattedMessage defaultMessage="Dashboard" id="Home / dashboard link" />
                </Link>
              </RoleAccess>
{/* 
              <RoleAccess>
                <Link
                  className={menuItemClassName}
                  to={generateLocalePath(RoutesConfig.saasIdeas)}
                  onClick={closeSidebar}
                  navLink
                >
                  <svg className="w-5 h-5 text-gray-600 mr-3 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 18" fill="currentColor">
                    <path d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z" fill="currentColor" />
                    <path d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z" fill="currentColor" />
                  </svg>
                  <FormattedMessage defaultMessage="Chatbot" id="Home / openai integration link" />
                </Link>
              </RoleAccess> */}

              <RoleAccess>
                <Link
                  className={menuItemClassName}
                  to={generateLocalePath(RoutesConfig.saasIdeas)}
                  onClick={closeSidebar}
                  navLink
                >
                  <svg className="w-5 h-5 text-gray-600 mr-3 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 15 20">
                    <path d="M9.092 18h-4a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2Zm-2-18a7.009 7.009 0 0 0-7 7 7.8 7.8 0 0 0 2.219 5.123c.956 1.195 1.781 2.228 1.781 3.877a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1c0-1.7.822-2.7 1.774-3.868A7.63 7.63 0 0 0 14.092 7a7.009 7.009 0 0 0-7-7Zm0 5a2 2 0 0 0-2 2 1 1 0 0 1-2 0 4 4 0 0 1 4-4 1 1 0 0 1 0 2Z" />
                  </svg>
                  <FormattedMessage defaultMessage="Business Ideas" id="Home / openai integration link" />
                </Link>
              </RoleAccess>

              <RoleAccess>
                <Link
                  className={menuItemClassName}
                  to={generateLocalePath(RoutesConfig.textGen)}
                  onClick={closeSidebar}
                  navLink
                >
                  <svg className="w-5 h-5 text-gray-600 mr-3 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M19 4h-1a1 1 0 1 0 0 2v11a1 1 0 0 1-2 0V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a1 1 0 0 0-1-1ZM3 4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4Zm9 13H4a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-3H4a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-3H4a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-3h-2a1 1 0 0 1 0-2h2a1 1 0 1 1 0 2Zm0-3h-2a1 1 0 0 1 0-2h2a1 1 0 1 1 0 2Z" />
                    <path d="M6 5H5v1h1V5Z" />
                  </svg>
                  <FormattedMessage defaultMessage="Write Content" id="Home / content items link" />
                </Link>
              </RoleAccess>

              <RoleAccess>
                <Link
                  className={menuItemClassName}
                  to={generateLocalePath(RoutesConfig.documents)}
                  onClick={closeSidebar}
                  navLink
                >
                  <svg className="w-5 h-5 text-gray-600 mr-3 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                    <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                    <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                  </svg>
                  <FormattedMessage defaultMessage="Documents" id="Home / documents link" />
                </Link>
              </RoleAccess>

              <RoleAccess>
                <Link
                  className={menuItemClassName}
                  to={generateLocalePath(RoutesConfig.crudDemoItem.list)}
                  onClick={closeSidebar}
                  navLink
                >
                  <svg className="w-5 h-5 text-gray-600 mr-3 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                  </svg>
                  <FormattedMessage defaultMessage="CRUD" id="Home / CRUD link" />
                </Link>
              </RoleAccess>

              <RoleAccess>
                <Link
                  className={menuItemClassName}
                  to={generateLocalePath(RoutesConfig.finances.paymentConfirm)}
                  onClick={closeSidebar}
                  navLink
                >
                  <svg className="w-5 h-5 text-gray-600 mr-3 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11.074 4 8.442.408A.95.95 0 0 0 7.014.254L2.926 4h8.148ZM9 13v-1a4 4 0 0 1 4-4h6V6a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-2h-6a4 4 0 0 1-4-4Z" />
                    <path d="M19 10h-6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Zm-4.5 3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM12.62 4h2.78L12.539.41a1.086 1.086 0 1 0-1.7 1.352L12.62 4Z" />
                  </svg>
                  <FormattedMessage defaultMessage="Payments" id="Home / payments link" />
                </Link>
              </RoleAccess>

              <RoleAccess>
                <Link
                  className={menuItemClassName}
                  to={generateLocalePath(RoutesConfig.subscriptions.index)}
                  onClick={closeSidebar}
                  navLink
                >
                  <svg className="w-5 h-5 text-gray-600 mr-3 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                  <FormattedMessage defaultMessage="Subscription" id="Home / subscriptions link" />
                </Link>
              </RoleAccess>

              <RoleAccess allowedRoles={Role.ADMIN}>
                <Link
                  className={menuItemClassName}
                  to={generateLocalePath(RoutesConfig.admin)}
                  onClick={closeSidebar}
                  navLink
                >
                  <FormattedMessage defaultMessage="Admin" id="Home / admin link" />
                </Link>
              </RoleAccess>

              <p className="my-2 ml-2 mt-4 text-sm text-muted-foreground">
                <FormattedMessage defaultMessage="More" id="Sidebar / static pages" />
              </p>

              <Link
                className={menuItemClassName}
                to={generateLocalePath(RoutesConfig.privacyPolicy)}
                onClick={closeSidebar}
                navLink
              >
                <FormattedMessage defaultMessage="Privacy Policy" id="Home / privacy policy link" />
              </Link>

              <Link
                className={menuItemClassName}
                to={generateLocalePath(RoutesConfig.termsAndConditions)}
                onClick={closeSidebar}
                navLink
              >
                <FormattedMessage defaultMessage="Terms of Usage" id="Home / t&c link" />
              </Link>
            </nav>
            <Alert variant="info">
              <AlertTitle className="text-sm">
                AI Studio is in Alpha stage now.
              </AlertTitle>
              <AlertDescription>
                <a
                  target="_blank"
                  className="underline"
                  href="https://aicurious.io/contact"
                  rel="noreferrer"
                >
                  Contact Authors
                </a>
              </AlertDescription>
            </Alert>
          </div>
          <nav className="-mx-2 flex flex-col gap-y-1 px-6 pb-2">
            {!isDesktop && (
              <>
                <Separator />
                <RoleAccess>
                  <Link
                    className={menuItemClassName}
                    to={generateLocalePath(RoutesConfig.profile)}
                    onClick={closeSidebar}
                    navLink
                  >
                    <FormattedMessage defaultMessage="Profile" id="Home / Profile link" />
                  </Link>
                  <Link
                    className={menuItemClassName}
                    to={generateLocalePath(RoutesConfig.logout)}
                    onClick={closeSidebar}
                    navLink
                  >
                    <FormattedMessage defaultMessage="Logout" id="Home / Logout link" />
                  </Link>
                </RoleAccess>
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};
