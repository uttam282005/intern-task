import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
export default function Error({ message }: { message: string }) {
 return (
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-500">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center">{message}</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => window.location.href= '/auth'}>Log In</Button>
          </CardFooter>
        </Card>
      </div>
    );
}