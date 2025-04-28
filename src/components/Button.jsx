import React from "react";
import classNames from "classnames";

export const Button = ({
  children,
  onClick,
  className = "",
  type = "button",
  variant = "default",
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md";

  const variants = {
    default: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    outline: "border border-white text-white hover:bg-white hover:text-indigo-600",
    ghost: "text-white hover:bg-white/10",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const finalClassName = classNames(baseStyles, variants[variant], className);

  return (
    <button type={type} onClick={onClick} className={finalClassName} {...props}>
      {children}
    </button>
  );
};
