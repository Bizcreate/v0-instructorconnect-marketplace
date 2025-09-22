import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dumbbell, Check, Star, Zap, Crown } from "lucide-react"

export default function PricingPage() {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      period: "forever",
      description: "Perfect for getting started",
      icon: Dumbbell,
      features: [
        "Create studio profile",
        "Post up to 2 jobs per month",
        "Browse instructor profiles",
        "Basic applicant management",
        "Email support",
      ],
      limitations: ["Limited to 2 active job postings", "Basic search filters only", "No featured job listings"],
      cta: "Get Started Free",
      popular: false,
    },
    {
      name: "Professional",
      price: "$49",
      period: "per month",
      description: "Most popular for growing studios",
      icon: Star,
      features: [
        "Everything in Basic",
        "Unlimited job postings",
        "Advanced search & filters",
        "Applicant tracking system",
        "Direct messaging with instructors",
        "Featured job listings (2 per month)",
        "Priority support",
        "Analytics dashboard",
      ],
      limitations: [],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$149",
      period: "per month",
      description: "For large studios and chains",
      icon: Crown,
      features: [
        "Everything in Professional",
        "Unlimited featured job listings",
        "Multi-location management",
        "Team collaboration tools",
        "Custom branding",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced reporting",
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  const instructorFeatures = [
    "Create detailed instructor profile",
    "Apply to unlimited jobs",
    "Direct messaging with studios",
    "Availability calendar management",
    "Application tracking",
    "Career resources & tips",
    "Mobile app access",
    "Email notifications",
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Dumbbell className="h-6 w-6 text-orange-500" />
              <span className="text-xl font-bold text-gray-900">InstructorConnect</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/jobs" className="text-gray-600 hover:text-orange-500">
                Browse Jobs
              </Link>
              <Link href="/browse-instructors" className="text-gray-600 hover:text-orange-500">
                Find Instructors
              </Link>
              <Link href="/pricing" className="text-orange-500 font-medium">
                Pricing
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild className="bg-orange-500 hover:bg-orange-600">
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the plan that works best for your fitness studio. All plans include our core features to help you
            find the perfect instructors.
          </p>
          <div className="flex justify-center">
            <Badge className="bg-green-500 text-white px-4 py-2 text-lg">✨ 14-day free trial on all paid plans</Badge>
          </div>
        </div>
      </section>

      {/* Studio Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">For Fitness Studios</h2>
            <p className="text-gray-600">Find and hire qualified instructors with ease</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const Icon = plan.icon
              return (
                <Card
                  key={index}
                  className={`relative ${
                    plan.popular ? "ring-2 ring-orange-500 scale-105" : ""
                  } hover:shadow-lg transition-all`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-orange-500 text-white px-4 py-1">Most Popular</Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                      <Icon className="h-8 w-8 text-orange-500" />
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      {plan.price !== "Free" && <span className="text-gray-600 ml-2">/{plan.period}</span>}
                    </div>
                    <p className="text-gray-600 mt-2">{plan.description}</p>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <Check className="h-4 w-4 text-green-500 mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {plan.limitations.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Limitations:</h4>
                        <ul className="space-y-1">
                          {plan.limitations.map((limitation, limitIndex) => (
                            <li key={limitIndex} className="text-xs text-gray-500">
                              • {limitation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Button
                      className={`w-full ${
                        plan.popular ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-900 hover:bg-gray-800"
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Instructor Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">For Fitness Instructors</h2>
            <p className="text-gray-600">Always free to create your profile and apply to jobs</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Zap className="h-8 w-8 text-green-500" />
                </div>
                <CardTitle className="text-2xl">Free Forever</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-600 ml-2">/forever</span>
                </div>
                <p className="text-gray-600 mt-2">Everything you need to find your next opportunity</p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6 text-left">
                  {instructorFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button className="w-full bg-orange-500 hover:bg-orange-600" asChild>
                  <Link href="/register?type=instructor">Create Your Profile</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I change plans anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect at your next
                  billing cycle.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. All payments are
                  processed securely.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is there a setup fee?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  No setup fees, ever. You only pay the monthly subscription fee for your chosen plan. Start with our
                  14-day free trial.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you offer refunds?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We offer a 30-day money-back guarantee. If you're not satisfied within the first 30 days, we'll refund
                  your payment in full.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join thousands of fitness studios and instructors already using InstructorConnect
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register?type=studio">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Dumbbell className="h-6 w-6 text-orange-500" />
                <span className="text-xl font-bold">InstructorConnect</span>
              </div>
              <p className="text-gray-400">Connecting Australia's fitness community</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Studios</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/post-job" className="hover:text-white">
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link href="/browse-instructors" className="hover:text-white">
                    Browse Instructors
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Instructors</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/jobs" className="hover:text-white">
                    Find Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-white">
                    Create Profile
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 InstructorConnect.com.au. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
