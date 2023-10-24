import { Button as ButtonBase, ButtonProps, ButtonSize } from '@shipfast/webapp-core/components/buttons';

export const Button = ({ onClick, ...props }: ButtonProps) => {
  return (
    <ButtonBase
      onClick={(event) => {
        event.stopPropagation();
        onClick?.(event);
      }}
      size={ButtonSize.SMALL}
      {...props}
    />
  );
};
