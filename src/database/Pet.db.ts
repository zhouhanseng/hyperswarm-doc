import { openDB, DBSchema, IDBPDatabase } from "idb/with-async-ittr-cjs";

const db = (function () {
  let db: IDBPDatabase<PetDB> = undefined as any;
  return async () => {
    if (typeof db === "undefined") {
      return openDB<PetDB>("pets", 1, {
        upgrade(db, oldVersion, _newVersion, transaction) {
          function v0_v1() {
            db.createObjectStore("owners", { keyPath: "name" });
            db.createObjectStore("pets", { keyPath: "name" });
            transaction
              .objectStore("owners")
              .createIndex("hasPetCertificate", "hasPetCertificate", {
                unique: false,
              });
            transaction
              .objectStore("pets")
              .createIndex("species", "species", { unique: false });
          }
          if (oldVersion < 1) v0_v1();
        },
      }).then((x) => (db = x));
    } else return db;
  };
})();

export async function createOwnerDB(): Promise<void> {
  const t = (await db()).transaction("owners", "readwrite");
  const record: OwnerRecordDb = {
    name: "zhc",
    hasPetCertificate: "no",
    petsLink: new Set(),
  };
  t.objectStore("owners").add(record);
}

interface OwnerRecordDb {
  name: string;
  hasPetCertificate: "no" | "yes";
  petsLink: Set<string>;
}

interface PetRecordDB {
  name: string;
  age: number;
  species: "cat" | "dog";
  ownerLink?: string;
}

interface PetDB extends DBSchema {
  /** Use inline keys */
  owners: {
    value: OwnerRecordDb;
    key: string;
    indexes: {
      hasPetCertificate: string;
    };
  };
  /** Use inline keys */
  pets: {
    value: PetRecordDB;
    key: string;
    indexes: {
      // Use `network` field as index
      species: string;
    };
  };
}
