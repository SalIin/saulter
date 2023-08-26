import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Button, VStack, useToast } from "@chakra-ui/react";

import TextField from "../../../TextField";

import { signup } from "../../../../http/auth";

import { ModalFlowType } from "../../AuthModal";

import { validatePasswordRepeat } from "../../../../utils";

interface SignupFormProps {
  changeModalFlow: (flow: ModalFlowType) => void;
  onSignup: VoidFunction;
}

interface FormFields {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const SignupForm: React.FC<SignupFormProps> = ({
  changeModalFlow,
  onSignup,
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
      passwordConfirmation: "",
    },
  });

  const { mutate, isLoading } = useMutation(signup, {
    onSuccess: () => {
      onSignup();

      toast({
        title: "User created",
        status: "success",
      });
    },
    onError: (e) => {
      const message = e as string;

      toast({
        title: message,
        status: "error",
      });
    },
  });

  const [email, password, passwordConfirmation] = watch([
    "email",
    "password",
    "passwordConfirmation",
  ]);

  const isFormFilled = email && password && passwordConfirmation;

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
    >
      <TextField
        variant="input"
        placeholder="mail@gmail.com"
        label="Email*"
        type="email"
        errors={errors}
        {...register("email")}
      />
      <TextField
        variant="input"
        placeholder="********"
        label="Password*"
        type="password"
        errors={errors}
        {...register("password")}
      />
      <TextField
        variant="input"
        placeholder="********"
        label="Confirm password*"
        type="password"
        errors={errors}
        {...register("passwordConfirmation", {
          validate: {
            validatePasswordRepeat: (v) => validatePasswordRepeat(v, password),
          },
        })}
      />
      <Button
        variant="text"
        size="sm"
        onClick={() => changeModalFlow("signin")}
      >
        Already have an account?
      </Button>
      <Button
        type="submit"
        w="full"
        isDisabled={!isFormFilled}
        isLoading={isLoading}
      >
        Sign up
      </Button>
    </VStack>
  );
};
