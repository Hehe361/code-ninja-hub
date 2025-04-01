import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Info, CreditCard, CreditCardIcon, Shield, Star } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import DarkModeToggle from "@/components/DarkModeToggle";

interface Feature {
  title: string;
  included: boolean;
  tooltip?: string;
}

interface Plan {
  id: string;
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  features: Feature[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: {
      monthly: 0,
      yearly: 0,
    },
    description: "Basic access to CodeX problems and community.",
    features: [
      { title: "Access to 100+ problems", included: true },
      { title: "Community forum access", included: true },
      { title: "Basic analytics", included: true },
      { title: "Daily challenges", included: false },
      { title: "Premium problems", included: false },
      { title: "AI code assistant", included: false, tooltip: "Advanced AI-powered code suggestions and debugging" },
      { title: "Private contests", included: false },
      { title: "Certification", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: {
      monthly: 9.99,
      yearly: 99.99,
    },
    description: "Enhanced features for serious programmers.",
    features: [
      { title: "Access to 100+ problems", included: true },
      { title: "Community forum access", included: true },
      { title: "Basic analytics", included: true },
      { title: "Daily challenges", included: true },
      { title: "Premium problems", included: true },
      { title: "AI code assistant", included: false, tooltip: "Advanced AI-powered code suggestions and debugging" },
      { title: "Private contests", included: false },
      { title: "Certification", included: false },
    ],
    popular: true,
  },
  {
    id: "elite",
    name: "Elite",
    price: {
      monthly: 19.99,
      yearly: 199.99,
    },
    description: "Complete access for professional coders.",
    features: [
      { title: "Access to 100+ problems", included: true },
      { title: "Community forum access", included: true },
      { title: "Basic analytics", included: true },
      { title: "Daily challenges", included: true },
      { title: "Premium problems", included: true },
      { title: "AI code assistant", included: true, tooltip: "Advanced AI-powered code suggestions and debugging" },
      { title: "Private contests", included: true },
      { title: "Certification", included: true },
    ],
  },
];

const Subscription = () => {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [userSubscription] = useState({
    plan: "free",
    renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Subscription Updated",
        description: `You've successfully subscribed to the ${plans.find(p => p.id === selectedPlan)?.name} plan!`,
      });
    }, 1500);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price === 0 ? 0 : 2,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            CodeX
          </Link>
          <div className="flex items-center gap-4">
            <DarkModeToggle />
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Upgrade Your Coding Journey</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Unlock premium features and accelerate your programming skills with a CodeX subscription plan.
            </p>
          </div>

          {userSubscription.plan !== "free" && (
            <Card className="mb-8 border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="font-semibold text-lg">Current Subscription: {userSubscription.plan.charAt(0).toUpperCase() + userSubscription.plan.slice(1)}</h3>
                    <p className="text-muted-foreground">
                      Renewal on {userSubscription.renewalDate.toLocaleDateString()}
                    </p>
                  </div>
                  <Button variant="outline">Manage Current Plan</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center p-1 bg-muted rounded-lg">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === "monthly" ? "bg-background shadow-sm" : "text-muted-foreground"
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === "yearly" ? "bg-background shadow-sm" : "text-muted-foreground"
                }`}
              >
                Yearly Billing
                <span className="ml-1.5 py-0.5 px-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  Save 15%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative flex flex-col ${
                  plan.popular ? "border-primary shadow-md" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-0 right-0 mx-auto w-fit px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-baseline justify-between">
                    <span>{plan.name}</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold">
                        {formatPrice(plan.price[billingCycle])}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        {billingCycle === "monthly" ? "/month" : "/year"}
                      </span>
                    </div>
                  </CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className={`mr-2 mt-0.5 ${feature.included ? "text-primary" : "text-muted-foreground"}`}>
                          {feature.included ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            <span className="block h-5 w-5 text-center">—</span>
                          )}
                        </span>
                        <span className={feature.included ? "" : "text-muted-foreground"}>
                          {feature.title}
                          {feature.tooltip && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="inline-block ml-1 h-3.5 w-3.5 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs">{feature.tooltip}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <RadioGroup 
                    value={selectedPlan} 
                    onValueChange={setSelectedPlan}
                    className="w-full"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={plan.id} id={`plan-${plan.id}`} />
                      <Label 
                        htmlFor={`plan-${plan.id}`} 
                        className="flex-grow cursor-pointer"
                      >
                        <Button 
                          variant={plan.id === selectedPlan ? "default" : "outline"} 
                          className="w-full"
                        >
                          {plan.id === userSubscription.plan ? "Current Plan" : "Select Plan"}
                        </Button>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardFooter>
              </Card>
            ))}
          </div>

          {selectedPlan !== "free" && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>
                  Enter your payment details to subscribe to the {plans.find(p => p.id === selectedPlan)?.name} plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as "card" | "paypal")}>
                  <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
                    <TabsTrigger value="card" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Credit Card
                    </TabsTrigger>
                    <TabsTrigger value="paypal" className="flex items-center gap-2">
                      <CreditCardIcon className="h-4 w-4" />
                      PayPal
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="card">
                    <form onSubmit={handlePaymentSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input id="cardName" placeholder="John Doe" required />
                        </div>
                        
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input 
                            id="cardNumber" 
                            placeholder="1234 5678 9012 3456" 
                            required
                            minLength={16}
                            maxLength={19}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiration Date</Label>
                            <Input id="expiry" placeholder="MM/YY" required />
                          </div>
                          <div>
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" required minLength={3} maxLength={4} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="terms" required />
                        <Label htmlFor="terms" className="text-sm font-normal">
                          I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                        </Label>
                      </div>
                      
                      <div>
                        <Button 
                          type="submit" 
                          className="w-full"
                          disabled={isProcessing}
                        >
                          {isProcessing ? "Processing..." : `Subscribe Now - ${formatPrice(plans.find(p => p.id === selectedPlan)?.price[billingCycle] || 0)}`}
                        </Button>
                        <p className="text-center text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1">
                          <Shield className="h-3 w-3" />
                          Secure payment processing
                        </p>
                      </div>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="paypal">
                    <div className="text-center py-6">
                      <p className="mb-4 text-muted-foreground">
                        You'll be redirected to PayPal to complete your payment.
                      </p>
                      <Button 
                        onClick={handlePaymentSubmit}
                        disabled={isProcessing}
                        className="w-full max-w-md"
                      >
                        {isProcessing ? "Processing..." : "Continue with PayPal"}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          <div className="max-w-3xl mx-auto mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium">How do I cancel my subscription?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    You can cancel anytime from your account settings. Your subscription will remain active until the end of your current billing period.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium">Can I switch between plans?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while downgrades apply at the end of your current billing cycle.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium">Are there any hidden fees?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    No, the price you see is the price you pay. There are no setup fees or hidden charges.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Subscription;
