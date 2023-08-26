import { SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";

interface SearchbarProps extends InputProps {}

export const Searchbar: React.FC<SearchbarProps> = (props) => {
  return (
    <InputGroup>
      <Input type="text" placeholder="Search for route" {...props} />
      <InputRightElement>
        <SearchIcon color="brand.500" w="4" />
      </InputRightElement>
    </InputGroup>
  );
};
