import React, { FC, MouseEvent } from "react";
// import { useConcent } from "concent";
import { useTheme } from "../../hooks/useTheme";
import { WithChildren } from "../../types/comp";
import { cx } from "@emotion/css";
import { wrapper, disabled_style } from "./style";
import { handlePropagation } from "../../utils/helpers";

type IProps = WithChildren<{
  onClick?: (arg0: MouseEvent) => void;
  text: string;
  icon: React.ReactElement;
  disabled?: boolean;
}>;

const ToolButton: FC<IProps> = ({ onClick, icon, text, disabled }: IProps) => {
  const IconProps = {
    theme: "outline",
    size: "20",
    strokeWidth: 2.5
  };

  return (
    <button
      onClick={disabled ? handlePropagation : onClick}
      className={cx(wrapper, { [disabled_style]: disabled })}
    >
      <span>
        {React.cloneElement(icon, { ...IconProps })}
        <span>{text}</span>
      </span>
    </button>
  );
};

export default ToolButton;
