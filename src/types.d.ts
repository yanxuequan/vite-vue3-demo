import { Store } from "vuex";
import axios from "axios";

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $store: Store<any>;
    $axios: typeof axios;
  }
}
