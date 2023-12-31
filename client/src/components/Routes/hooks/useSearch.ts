import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { search } from "../utils/debouncedSearch";

import { RouteInterface } from "../../../types/route";

export const useSearch = (
  initialRoutes: RouteInterface[],
  setRoutes: Dispatch<SetStateAction<RouteInterface[] | null>>
) => {
  const [searchString, setSearchString] = useState("");

  const filterRoutes = (term: string) => {
    const filteredRoutes = initialRoutes.filter(
      ({ title, shortDescription }) =>
        title.toLowerCase().includes(term) ||
        shortDescription.toLowerCase().includes(term)
    );

    setRoutes(filteredRoutes);
  };

  const handleSearchStringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  useEffect(() => {
    if (searchString) {
      search(searchString, filterRoutes);
    } else {
      setRoutes(initialRoutes);
    }
  }, [searchString]);

  return { searchString, handleSearchStringChange };
};
