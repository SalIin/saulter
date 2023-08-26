import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { VStack, Text, Button, useToast } from "@chakra-ui/react";

import TextField from "../../../TextField";

import { MarkerInterface } from "../../../RouteMap/hooks";

import { createRoute } from "../../../../http/route";

import { RouteInterface } from "../../../../types/route";

import { useAuthState } from "../../../../context/AuthProvider/hooks";

interface FormProps {
  routeLength: number;
  markers: MarkerInterface[];
  onRouteCreate: VoidFunction;
}

interface FormFields {
  title: string;
  shortDescription: string;
  description: string;
}

export const Form: React.FC<FormProps> = ({
  routeLength,
  markers,
  onRouteCreate,
}) => {
  const formattedRouteLength = routeLength.toFixed(2) + "km";

  const toast = useToast();
  const queryClient = useQueryClient();

  const { user } = useAuthState();

  const { mutate: createRouteMutation, isLoading } = useMutation(createRoute, {
    onSuccess: (data) => {
      onRouteCreate();

      queryClient.setQueryData(
        ["routes"],
        (oldData: RouteInterface[] | undefined) => {
          if (oldData) {
            return [...oldData, data];
          }

          return [data];
        }
      );

      toast({
        title: "Route created",
        description: "Your route has been successfully created",
        status: "success",
      });
    },
    onError: () => {
      toast({
        title: "Route creation failed",
        description: "Something went wrong, please try again later",
        status: "error",
      });
    },
  });

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      title: "",
      shortDescription: "",
      description: "",
    },
  });

  const [title, shortDescription, description] = watch([
    "title",
    "shortDescription",
    "description",
  ]);

  const isFormFilled = title && shortDescription && description && routeLength;

  const onSubmit = (data: FormFields) => {
    const route = {
      ...data,
      length: formattedRouteLength,
      markers,
      favorited: false,
    };

    createRouteMutation({
      route,
      token: user?.accessToken ?? "",
    });
  };

  return (
    <VStack
      as="form"
      w={{ base: "100%", md: "50%" }}
      spacing="6"
      alignItems="flex-start"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        variant="input"
        placeholder="Route title"
        label="Title*"
        errors={errors}
        {...register("title")}
      />
      <TextField
        variant="textarea"
        placeholder="Short description"
        label="Short description*"
        rows={2}
        resize="none"
        maxLength={160}
        errors={errors}
        {...register("shortDescription")}
      />
      <TextField
        variant="textarea"
        placeholder="Full description"
        label="Description*"
        rows={4}
        resize="none"
        errors={errors}
        {...register("description")}
      />
      <Text fontWeight="bold">
        Route length:{" "}
        <Text as="span" color="brand.500">
          {formattedRouteLength}
        </Text>
      </Text>
      <Button
        type="submit"
        w="full"
        isDisabled={!isFormFilled}
        isLoading={isLoading}
      >
        Create route
      </Button>
    </VStack>
  );
};
