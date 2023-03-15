import { createPinia, Pinia } from "pinia";

import { useUserStore } from "./module/user";
import { useSongStore } from "./module/songs";

const store: Pinia = createPinia();

export { store, useUserStore, useSongStore };
