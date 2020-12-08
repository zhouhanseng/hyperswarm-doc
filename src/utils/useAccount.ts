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

  defaultAccountRef.addListener((newVal, _oldVal) => {
    setDefaultAccount(newVal);
  });

  return defaultAccount;
}

setInterval(() => {
  defaultAccountRef.value = {
    account_name: "zhc" + Math.floor(Math.random() * 100),
  } as Account;
}, 2000);
