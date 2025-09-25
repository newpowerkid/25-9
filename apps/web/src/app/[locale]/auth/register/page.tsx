import { ArrowRight } from "lucide-react";
import Link from "next/link";

import {
  GoogleSignInButton,
  LineSignInButton,
  RegisterForm,
} from "~/components/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
} from "~/components/ui";

const RegisterPage = () => {
  return (
    <Card className="w-md max-w-[90vw]">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Please enter your information to create an account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <GoogleSignInButton />
        <LineSignInButton />
        {/*<div className="relative my-6">
          <Separator />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-background px-2 text-muted-foreground text-xs">
              OR
            </span>
          </div>
        </div>*/}
        {/*<RegisterForm />*/}
        <p className="mt-4 flex flex-wrap justify-center gap-1 text-muted-foreground text-sm">
          Already have an account?{" "}
          <Link
            className="flex items-center gap-1 text-primary"
            href="/auth/login"
          >
            Sign in <ArrowRight size={14} />
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default RegisterPage;
