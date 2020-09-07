import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { Button } from "@material-ui/core";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav className="mb-1">
        <Button>
          <Link href="/">
            <a>home</a>
          </Link>
        </Button>
        <Button>
          <Link href="/redux">
            <a>redux-rechyons</a>
          </Link>
        </Button>
        <Button>
          <Link href="/graphql">
            <a>graphql</a>
          </Link>
        </Button>
        <Button>
          <Link href="/i18n">
            <a>i18n</a>
          </Link>
        </Button>
        <Button>
          <Link href="/users">
            <a>users list</a>
          </Link>
        </Button>
        <Button>
          <Link href="/api/users">
            <a>users api</a>
          </Link>
        </Button>
      </nav>
    </header>
    {children}
  </div>
);

export default Layout;
