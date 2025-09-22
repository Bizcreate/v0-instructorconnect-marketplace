import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dumbbell, ArrowLeft, Mail } from "lucide-react"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/login" className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Sign In
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Dumbbell className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold text-gray-900">InstructorConnect</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Your Password</h1>
          <p className="text-gray-600">Enter your email address and we'll send you a link to reset your password</p>
        </div>

        <Card>
          <CardContent className="p-8">
            <form className="space-y-6">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" />
              </div>

              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 h-12">
                <Mail className="h-4 w-4 mr-2" />
                Send Reset Link
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Remember your password?{" "}
                <Link href="/login" className="text-orange-500 hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
