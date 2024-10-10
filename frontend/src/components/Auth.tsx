import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { BACKEND_URL } from "@/constants/index";
type FormData = {
  name?: string;
  email: string;
  password: string;
};

export default function AuthComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    console.log(data);

    // Determine whether to sign in or sign up
    const endpoint = activeTab === "signin" ? "/signin" : "/signup";

    fetch(`${BACKEND_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        // Check if the response is not OK (status 400, 500, etc.)
        if (!response.ok) {
          return response.json().then((errorData) => {
            // Handle specific 400 error
            if (response.status === 400) {
              alert(errorData.msg || "Please sign up first!");
            } else {
              alert(`Error: ${response.statusText}`);
            }
            throw new Error(errorData.msg || `Error: ${response.statusText}`);
          });
        }
        return response.json(); // Continue if response is OK (status 200-299)
      })
      .then((data) => {
        if (data.error) {
          alert(data.error); // Handle error returned in response body
        } else {
          window.localStorage.setItem("token", data.token);
          window.location.href = "/properties";
        }
      })
      .catch((error) => {
        console.error(error); // Handle network or other errors
      });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 bg-opacity-50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Welcome to LuxuryEstates
          </CardTitle>
          <CardDescription className="text-center text-gray-300">
            Sign up or sign in to access exclusive property listings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="signin"
            onValueChange={(value) =>
              setActiveTab(value as "signin" | "signup")
            }
          >
            <TabsList className="grid w-full grid-cols-2 bg-gray-700">
              <TabsTrigger
                value="signin"
                className="text-white data-[state=active]:bg-gray-600"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="text-white data-[state=active]:bg-gray-600"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TabsContent value="signin">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signinEmail" className="text-gray-200">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="signinEmail"
                        placeholder="Enter your email"
                        type="email"
                        className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Invalid email address",
                          },
                        })}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signinPassword" className="text-gray-200">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="signinPassword"
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        className="pl-10 pr-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                          },
                        })}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="signup">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signupName" className="text-gray-200">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="signupName"
                        placeholder="Enter your full name"
                        type="text"
                        className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        {...register("name", {
                          required:
                            activeTab === "signup" && "Full name is required",
                        })}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupEmail" className="text-gray-200">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="signupEmail"
                        placeholder="Enter your email"
                        type="email"
                        className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Invalid email address",
                          },
                        })}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupPassword" className="text-gray-200">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="signupPassword"
                        placeholder="Create a password"
                        type={showPassword ? "text" : "password"}
                        className="pl-10 pr-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                          },
                        })}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>
              <CardFooter className="mt-6">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  {activeTab === "signin" ? "Sign In" : "Sign Up"}
                </Button>
              </CardFooter>
            </form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
