import * as z from "zod"
import { Lock, Shell } from 'lucide-react';
import { createFileRoute } from '@tanstack/react-router'
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const loginFormSchema = z.object({
  email: z.email("Please enter a valid email."),
  password: z
    .string()
    .min(5, "Min password length should be 5.")
    .max(15, "Max password length should be 15."),
});

export const Route = createFileRoute('/_public/login')({
  component: LoginPage,
});

function LoginPage() {
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof loginFormSchema>) {
    console.log(data);
  }

  return (
    <Card className='min-w-md'>
      <CardHeader>
        <Shell className='size-16' />
        <CardTitle>Login</CardTitle>
        <CardDescription>Please enter your credentials to login.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id='login-form' onSubmit={loginForm.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FieldSet>
              <Controller
                name="email"
                control={loginForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">
                      Email
                    </FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      type='email'
                      aria-invalid={fieldState.invalid}
                      placeholder="Please enter your email"
                      // autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={loginForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="password"
                      type='password'
                      aria-invalid={fieldState.invalid}
                      placeholder="Please enter your password"
                      // autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldSet>
          </FieldGroup>
          <Field>
            <Button type='submit' className="w-full mt-5">
              <Lock />
              <span>Login</span>
            </Button>
          </Field>
        </form>
      </CardContent>
    </Card>
  );
}
