import stringify from "json-stable-stringify";
import { useState } from "react";
import { ValueRef } from "./valueRef";

type Account = {
  account_name: string;
};

const accountComparer = (a: Account | null, b: Account | null) => {
  if (!a || !b) return false;

  return stringify(a) === stringify(b);
};

const defaultAccountRef = new ValueRef<Account | null>(null, accountComparer);

export function useDefaultAccountRef() {
  const [defaultAccount, setDefaultAccount] = useState(defaultAccountRef.value);

  defaultAccountRef.addListener((newVal, oldVal) => {
    console.log(newVal, oldVal);
    setDefaultAccount(newVal);
  });

  return defaultAccount;
}

setTimeout(() => {
  defaultAccountRef.value = { account_name: "zhcd" } as Account;
}, 1000);

setTimeout(() => {
  defaultAccountRef.value = { account_name: "zhc" } as Account;
}, 2000);
