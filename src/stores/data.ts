//  ./src/stores/todo.ts
import { action, observable } from "mobx";

export class DataStore {
  @observable json = {
    filename: "Seditor",

    global: {
      title: "Seditor Page",
      bodyColor: "#333",
      css: "",
      js: "function func(){console.log(1)}",
    },

    main: "<div>123<span>btn</span></div><div>456</div>",

    component: [
      {
        name: "list-item",
        htmlstr: "<div>item<span>i m component btn</span></div>",
      },
    ],
  };

  @action.bound handleSetToken(json: any) {
    this.json = json;
  }
}

export const DATA_KEY = "dataStore";
