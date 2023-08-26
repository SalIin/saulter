import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { VStack, Button, useToast } from "@chakra-ui/react";

import TextField from "../../../TextField";

import { ModalFlowType } from "../../AuthModal";

import { login } from "../../../../http/auth";

import { REGEXP } from "../../../../constants/regexp";
import { ERRORS } from "../../../../constants/errors";
import { useAuthState } from "../../../../context/AuthProvider/hooks";

interface SigninFormProps {
  changeModalFlow: (flow: ModalFlowType) => void;
  onSignin: VoidFunction;
}

interface FormFields {
  email: string;
  password: string;
}

export const SigninForm: React.FC<SigninFormProps> = ({
  changeModalFlow,
  onSignin,
}) => {
  const toast = useToast();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setUser } = useAuthState();

  const { mutate, isLoading } = useMutation(login, {
    onSuccess: (data) => {
      onSignin();

      setUser(data);
    },
    onError: (e) => {
      const message = e as string;

      toast({
        title: message,
        status: "error",
      });
    },
  });

  const [email, password] = watch(["email", "password"]);

  const isFormFilled = email && password;

  const onSubmit = (data: FormFields) => {
    mutate(data);
  };

  return (
    <VStack
      as="form"
      w="full"
      spacing="6"
      alignItems="flex-start"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <TextField
        variant="input"
        placeholder="mail@gmail.com"
        label="Email*"
        type="email"
        errors={errors}
        {...register("email", {
          pattern: {
            value: REGEXP.EMAIL,
            message: ERRORS.INVALID_EMAIL_ERROR,
          },
        })}
      />
      <TextField
        variant="input"
        placeholder="********"
        label="Password*"
        type="password"
        errors={errors}
        {...register("password", {
          minLength: {
            value: 6,
            message: ERRORS.INVALID_PASSWORD_LENGTH_ERROR,
          },
        })}
      />
      <Button
        variant="text"
        size="sm"
        onClick={() => changeModalFlow("signup")}
      >
        Not have an account yet?
      </Button>
      <Button
        type="submit"
        w="full"
        isDisabled={!isFormFilled}
        isLoading={isLoading}
      >
        Sign in
      </Button>
    </VStack>
  );
};
