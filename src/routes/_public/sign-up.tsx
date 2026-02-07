import * as z from "zod"
import { Lock, Shell } from 'lucide-react';
import { createFileRoute } from '@tanstack/react-router'
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const signupFormSchema = z.object({
  fullname: z
    .string()
    .min(5, "Minimum Fullname length should be 5.")
    .max(30, "Minimum Fullname length should be 30."),
  email: z.email("Please enter a valid email."),
  password: z
    .string()
    .min(5, "Min password length should be 5.")
    .max(15, "Max password length should be 15."),
});

export const Route = createFileRoute('/_public/sign-up')({
  component: SignupPage,
})

function SignupPage() {
  const signupForm = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof signupFormSchema>) {
    console.log(data);
  }
  return (
    <Card className='min-w-md'>
      <CardHeader>
        <Shell className='size-16' />
        <CardTitle>Signup</CardTitle>
        <CardDescription>Please enter your credentials to Signup.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id='login-form' onSubmit={signupForm.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FieldSet>
              <Controller
                name="fullname"
                control={signupForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="fullname">
                      Full Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="fullname"
                      type='fullname'
                      aria-invalid={fieldState.invalid}
                      placeholder="Please enter your fullname"
                    // autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={signupForm.control}
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
                control={signupForm.control}
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
              <span>Signup</span>
            </Button>
          </Field>
        </form>
      </CardContent>
    </Card>
  );
}
