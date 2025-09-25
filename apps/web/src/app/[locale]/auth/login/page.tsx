import { ArrowRight } from "lucide-react";
import Link from "next/link";

import {
  GoogleSignInButton,
  LineSignInButton,
  LoginForm,
} from "~/components/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
} from "~/components/ui";

const LoginPage = () => {
  return (
    <Card className="w-md max-w-[90vw]">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>
          Please enter your credentials to sign in.
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
        {/*<LoginForm />*/}
        <p className="mt-4 flex flex-wrap justify-center gap-1 text-muted-foreground text-sm">
          Don&apos;t have an account yet?{" "}
          <Link
            className="flex items-center gap-1 text-primary"
            href="/auth/register"
          >
            Create an account <ArrowRight size={14} />
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
