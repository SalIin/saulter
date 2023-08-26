import debounce from "lodash.debounce";

export const search = debounce(
  (searchString: string, cb: (searchString: string) => void) => {
    cb(searchString);
  },
  300
);
