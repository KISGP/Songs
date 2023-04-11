import { createPinia, Pinia } from "pinia";

import { useUserStore } from "./module/user";
import { useSongStore } from "./module/songs";
import { useDataStore } from "./module/data";

const store: Pinia = createPinia();

export { store, useUserStore, useSongStore, useDataStore };
