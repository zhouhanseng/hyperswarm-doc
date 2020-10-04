import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { Button, Typography } from "@material-ui/core";

type Props = {
  children?: ReactNode;
  title?: string;
};

type NavigateProps = {
  link: string;
  title: string;
};

const Navigate = ({ link, title }: NavigateProps) => (
  <Typography color="textPrimary" variant="body1" className="inline-block">
    <Link href={link}>
      <a>
        <Button className="normal-case">{title}</Button>
      </a>
    </Link>
  </Typography>
);

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav className="mb-2">
        <Navigate link="/useMemo" title="useMemo" />
        <Navigate link="/redux" title="redux" />
        <Navigate link="/cache-image" title="cache-image" />
        <Navigate link="/i18n" title="i18n" />
        <Navigate link="/useValueRef" title="useValueRef" />
      </nav>
    </header>
    {children}
  </div>
);

export default Layout;
