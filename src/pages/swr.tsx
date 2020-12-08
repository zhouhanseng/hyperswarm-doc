import React, { useState } from "react";
import { useSWRInfinite } from "swr";
import Layout from "../components/Layout";
import { PageAnimate } from "../components/PageAnimate";
import { TextField, Button, ListItem, Typography } from "@material-ui/core";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const PAGE_SIZE = 6;

const Page = () => {
  const [repo, setRepo] = useState("reactjs/react-a11y");
  const [val, setVal] = useState(repo);

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) =>
      `https://api.github.com/repos/${repo}/issues?per_page=${PAGE_SIZE}&page=${
        index + 1
      }`,
    fetcher
  );

  const issues = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;

  return (
    <Layout title="redux">
      <PageAnimate>
        <section className="mt-3">
          <section className="flex items-baseline">
            <TextField
              value={val}
              onChange={(e) => setVal(e.target.value)}
              label="repo"
            />
            <Button
              onClick={() => {
                setRepo(val);
                setSize(1);
              }}
              color="primary"
              variant="outlined"
              className="ml-4"
            >
              load issues
            </Button>
          </section>
          <div className="flex mt-4 items-baseline">
            <Button
              className="mr-3"
              color="primary"
              variant="outlined"
              disabled={isLoadingMore || isReachingEnd}
              onClick={() => setSize(size + 1)}
            >
              {isLoadingMore
                ? "loading..."
                : isReachingEnd
                ? "no more issues"
                : "load more"}
            </Button>
            <Button
              className="mr-3"
              variant="outlined"
              color="primary"
              disabled={isRefreshing}
              onClick={() => mutate()}
            >
              {isRefreshing ? "refreshing..." : "refresh"}
            </Button>
            <Button
              className="mr-3"
              variant="outlined"
              color="primary"
              disabled={!size}
              onClick={() => setSize(0)}
            >
              clear
            </Button>
          </div>
          <Typography className="mr-3 mt-3 text-purple-900" variant="h6">
            showing {size} page(s) of {isLoadingMore ? "..." : issues.length}{" "}
            issue(s){" "}
          </Typography>
          {isEmpty ? <p>Yay, no issues found.</p> : null}
          <ul>
            {issues.map(({ id, title }: { id: number; title: string }) => {
              return (
                <ListItem key={id} className="text-teal-800">
                  - {title}
                </ListItem>
              );
            })}
          </ul>
        </section>
      </PageAnimate>
    </Layout>
  );
};

Page.getInitialProps = () => {
  return {
    namespacesRequired: ["common"],
  };
};

export default Page;
