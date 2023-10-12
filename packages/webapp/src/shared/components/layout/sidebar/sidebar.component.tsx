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


import { DashboardIcon, CardStackIcon, CalendarIcon, ChatBubbleIcon, Pencil1Icon, StackIcon, ColorWheelIcon, SunIcon, SliderIcon, ImageIcon } from '@radix-ui/react-icons';
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
                  src="/images/logo.png"
                  className="h-12"
                />
                <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white ml-2">
                  AICurious <span className="text-gray-500">Studio</span>
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
                  <DashboardIcon className="mr-2" />
                  <FormattedMessage defaultMessage="Dashboard" id="Home / dashboard link" />
                </Link>
              </RoleAccess>

              <RoleAccess>
                <Link
                  className={menuItemClassName}
                  to={generateLocalePath(RoutesConfig.saasIdeas)}
                  onClick={closeSidebar}
                  navLink
                >
                  <ChatBubbleIcon className="mr-2" />
                  <FormattedMessage defaultMessage="Chatbot" id="Home / openai integration link" />
                </Link>
              </RoleAccess>

              <RoleAccess>
                <Link
                  className={menuItemClassName}
                  to="/privacy-policy"
                  onClick={closeSidebar}
                  navLink
                >
                  <SunIcon className="mr-2" />
                  <FormattedMessage defaultMessage="Ý tưởng kinh doanh" id="Home / openai integration link" />
                </Link>
              </RoleAccess>

              <RoleAccess>
                <Link
                  className={menuItemClassName}
                  to="/privacy-policy"
                  onClick={closeSidebar}
                  navLink
                >
                  <SliderIcon className="mr-2" />
                  <FormattedMessage defaultMessage="Kịch bản thuyết trình" id="Home / openai integration link" />
                </Link>
              </RoleAccess>

              <RoleAccess>
                <Link
                  className={menuItemClassName}
                  to="/privacy-policy"
                  onClick={closeSidebar}
                  navLink
                >
                  <ImageIcon className="mr-2" />
                  <FormattedMessage defaultMessage="Sáng tạo media" id="Home / openai integration link" />
                </Link>
              </RoleAccess>

              <RoleAccess>
                <Link
                  className={menuItemClassName}
                  to={generateLocalePath(RoutesConfig.demoItems)}
                  onClick={closeSidebar}
                  navLink
                >
                  <Pencil1Icon className="mr-2" />
                  <FormattedMessage defaultMessage="Nội dung" id="Home / content items link" />
                </Link>
              </RoleAccess>

              <RoleAccess>
                <Link
                  className={menuItemClassName}
                  to={generateLocalePath(RoutesConfig.documents)}
                  onClick={closeSidebar}
                  navLink
                >
                  <StackIcon className="mr-2" />
                  <FormattedMessage defaultMessage="Tài liệu" id="Home / documents link" />
                </Link>
              </RoleAccess>

              <RoleAccess>
                <Link
                  className={menuItemClassName}
                  to={generateLocalePath(RoutesConfig.crudDemoItem.list)}
                  onClick={closeSidebar}
                  navLink
                >
                  <ColorWheelIcon className="mr-2" />
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
                  <CardStackIcon className="mr-2" />
                  <FormattedMessage defaultMessage="Thanh toán" id="Home / payments link" />
                </Link>
              </RoleAccess>

              <RoleAccess>
                <Link
                  className={menuItemClassName}
                  to={generateLocalePath(RoutesConfig.subscriptions.index)}
                  onClick={closeSidebar}
                  navLink
                >
                  <CalendarIcon className="mr-2" />
                  <FormattedMessage defaultMessage="Đăng ký" id="Home / subscriptions link" />
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
                <FormattedMessage defaultMessage="Static pages" id="Sidebar / static pages" />
              </p>

              <Link
                className={menuItemClassName}
                to={generateLocalePath(RoutesConfig.privacyPolicy)}
                onClick={closeSidebar}
                navLink
              >
                <FormattedMessage defaultMessage="Privacy policy" id="Home / privacy policy link" />
              </Link>

              <Link
                className={menuItemClassName}
                to={generateLocalePath(RoutesConfig.termsAndConditions)}
                onClick={closeSidebar}
                navLink
              >
                <FormattedMessage defaultMessage="Terms and conditions" id="Home / t&c link" />
              </Link>
            </nav>
            <Alert variant="info">
              <AlertTitle className="text-sm">
                AI Studio by{' '}
                <a href="https://aicurious.io" target="_blank" rel="noreferrer">
                AICurious
                </a>
              </AlertTitle>
              <AlertDescription>
                <a
                  target="_blank"
                  className="underline"
                  href="https://aicurious.io/contact"
                  rel="noreferrer"
                >
                  Feedback and Support
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
