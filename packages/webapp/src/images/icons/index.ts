import { ReactComponent as FacebookImg } from './facebook.svg';
import { ReactComponent as GoogleImg } from './google.svg';
import { ReactComponent as HeaderLogoImg } from './headerLogo.svg';
import { makeIcon } from './makeIcon';

//<-- IMPORT ICON FILE -->

export const FacebookIcon = makeIcon(FacebookImg);
export const GoogleIcon = makeIcon(GoogleImg);
export const HeaderLogoIcon = makeIcon(HeaderLogoImg);
export const HeaderLogoDarkIcon = HeaderLogoIcon;
//<-- EXPORT ICON COMPONENT -->
