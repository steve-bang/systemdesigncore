import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type BaseProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
};

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: false; href?: never };
type LinkButtonProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; asChild?: false };

type Props = ButtonProps | LinkButtonProps;

export function Button({ className, variant = "primary", size = "md", children, ...props }: Props) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 disabled:pointer-events-none disabled:opacity-60",
    variant === "primary" && "bg-brand text-white shadow-[0_12px_26px_rgba(47,107,255,0.3)] hover:bg-[#2659d6]",
    variant === "ghost" && "border border-line bg-surface text-ink hover:bg-surface-soft",
    size === "md" && "h-11 px-5 text-sm",
    size === "lg" && "h-12 px-6 text-[15px]",
    className
  );

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;

    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
