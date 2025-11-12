import React, { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import AccountSidebar from "../components/AccountSidebar";
import axiosInstance from "@/utils/axiosInstance";
import { getApiUrl } from "../config/api";
import axios from "axios";
import SubscriptionHeader from "@/components/subscription/SubscriptionHeader";
import StatsCards from "@/components/subscription/StatsCards";
import FreePlanCard from "@/components/subscription/FreePlanCard";
import PlusPlanCard from "@/components/subscription/PlusPlanCard";
import CancelSubscriptionModal from "@/components/subscription/CancelSubscriptionModal";

const Subscription: React.FC = () => {
  const navigate = useNavigate();

  // State for subscription management
  const [isLoading, setIsLoading] = useState(false);

  // Cancel subscription state
  const [isCancelling, setIsCancelling] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [subscriptionCancelled, setSubscriptionCancelled] = useState(false);

  // Billing cycle selection for checkout
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly"
  );

  // Subscription status state
  const [subscriptionData, setSubscriptionData] = useState<{
    has_subscription: boolean;
    subscription: {
      _id: string;
      user_id: string;
      stripe_session_id: string;
      stripe_payment_id: string | null;
      amount: number;
      currency: string;
      status: string;
      plan_type: string;
      credits_amount: number;
      created_at: string;
      updated_at: string;
    } | null;
  }>({
    has_subscription: false,
    subscription: null,
  });
  const [isSubscriptionLoading, setIsSubscriptionLoading] = useState(true);
  const [subscriptionError, setSubscriptionError] = useState<string | null>(
    null
  );

  // Credits quota state (free try-ons + credits)
  const [quotaData, setQuotaData] = useState<
    | {
      userType: string;
      freeTryOnQuota: number;
      lastQuotaReset?: string;
      nextResetTime?: string;
      monthlyUsage?: number;
      monthlyLimit?: number;
      monthlyRemaining?: number;
      credits: number;
    }
    | null
  >(null);
  const [isQuotaLoading, setIsQuotaLoading] = useState(true);

  // Plans data for dynamic pricing/details
  type PlanInfo = {
    name: string;
    description: string;
    credits_per_cycle: number;
    billing_cycle: "monthly" | "annual" | string;
    amount_cents: number;
    currency: string;
    amount_display: string;
    credits_per_dollar?: number;
  };
  const [plans, setPlans] = useState<Record<string, PlanInfo>>({});
  const [isPlansLoading, setIsPlansLoading] = useState(true);

  // Fetch subscription status and credits quota on component mount
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No authentication token found");
      setSubscriptionError("No authentication token found");
      setIsSubscriptionLoading(false);
      setIsQuotaLoading(false);
      return;
    }

    // Fetch subscription status
    axiosInstance
      .get(getApiUrl("SUBSCRIPTION_API", "/api/subscription/status"), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setSubscriptionData(response.data);
        console.log("Subscription data:", response.data);
        setSubscriptionError(null);
      })
      .catch((error: unknown) => {
        console.error("Subscription status error:", error);
        setSubscriptionError("Failed to load subscription status");
      })
      .finally(() => {
        setIsSubscriptionLoading(false);
      });

    // Fetch credits quota (freeTryOnQuota + credits)
    axiosInstance
      .get(getApiUrl("AUTH_API", "/auth/credits/quota"), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { quota, credits } = response.data || {};
        setQuotaData({
          userType: quota?.userType || "free",
          freeTryOnQuota: quota?.freeTryOnQuota ?? 0,
          lastQuotaReset: quota?.lastQuotaReset,
          nextResetTime: quota?.nextResetTime,
          monthlyUsage: quota?.monthlyUsage,
          monthlyLimit: quota?.monthlyLimit,
          monthlyRemaining: quota?.monthlyRemaining,
          credits: typeof credits === "number" ? credits : 0,
        });
      })
      .catch((error: unknown) => {
        console.error("Quota fetch error:", error);
      })
      .finally(() => {
        setIsQuotaLoading(false);
      });

    // Fetch available subscription plans (no auth required)
    const plansEndpoint = getApiUrl("SUBSCRIPTION_API", "/api/plans");

    axiosInstance
      .get(plansEndpoint)
      .then((response) => {
        const { plans: plansMap } = response.data || {};
        if (plansMap && typeof plansMap === "object") {
          setPlans(plansMap);
        } else {
          setPlans({});
        }
      })
      .catch((error: unknown) => {
        console.error("Plans fetch error:", error);
        setPlans({});
      })
      .finally(() => {
        setIsPlansLoading(false);
      });
  }, [navigate]);

  // Helper function to check if user has plus plan
  const hasPlusPlan = () => {
    return (
      !isSubscriptionLoading &&
      !subscriptionError &&
      subscriptionData.has_subscription
    );
  };

  // Helper function to check if user has premium access (for cancelled subscriptions)
  const hasPremiumAccess = () => {
    return (
      !isQuotaLoading &&
      quotaData?.userType === "premium"
    );
  };

  // Helper function to format currency
  const formatCurrency = (amount: number, currency: string) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    });
    return formatter.format(amount / 100); // Convert from cents to dollars
  };

  // Helper function to calculate days until renewal
  const calculateDaysUntilRenewal = () => {
    if (!subscriptionData.subscription) return null;

    // For monthly subscription, calculate based on the created_at date
    // Stripe typically uses a 30-day billing cycle for monthly subscriptions
    // The server time appears to be in UTC format (e.g., 2025-10-18T23:27:13.681000)
    const createdAt = new Date(subscriptionData.subscription.created_at);

    // Add exactly 30 days for the renewal date (standard Stripe monthly cycle)
    const renewalDate = new Date(createdAt);
    renewalDate.setDate(renewalDate.getDate() + 30);

    // Get current time in UTC to match server time
    const now = new Date();

    // Calculate the difference in days
    const diffTime = renewalDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  };

  // Daily free credits = freeTryOnQuota * 5 (computed in StatsCards)

  // Derived helpers for selected plan display
  const selectedPlanId = billingCycle === "monthly" ? "plus_monthly" : "plus_annual";
  const selectedPlan = plans[selectedPlanId];
  const getSelectedAmountDisplay = () => selectedPlan?.amount_display || (billingCycle === "monthly" ? "$9.99" : "$108.00");
  const getSelectedPriceLabel = () => (billingCycle === "monthly" ? "per month" : "per year");

  const handleChoosePlan = async (cycle: "monthly" | "annual" = billingCycle) => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        message.error("Please login first");
        navigate("/signin");
        return;
      }

      // Map cycle to plan_id
      const planId = cycle === "monthly" ? "plus_monthly" : "plus_annual";

      const response = await axiosInstance.post(
        getApiUrl("SUBSCRIPTION_API", "/api/create-checkout-session"),
        { plan_id: planId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.url) {
        // Redirect to Stripe checkout
        window.location.href = response.data.url;
      }
    } catch (error: unknown) {
      console.error("Checkout error:", error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          message.error("Session expired. Please login again.");
          navigate("/signin");
        } else if (error.response?.status === 400) {
          message.error(
            error.response.data?.message ||
            "You already have a subscription or there was an error creating the checkout session."
          );
        } else {
          message.error("Failed to create checkout session. Please try again.");
        }
      } else {
        message.error("Failed to create checkout session. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    setIsCancelling(true);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        message.error("No authentication token found");
        setIsCancelling(false);
        return;
      }

      const response = await axiosInstance.delete(
        getApiUrl("SUBSCRIPTION_API", "/api/subscription/cancel"),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        // Update subscription state locally
        const prevSubscription = subscriptionData.subscription;
        setSubscriptionData({
          has_subscription: false,
          subscription: null,
        });

        setShowCancelConfirm(false);
        setSubscriptionCancelled(true);
        message.success(
          "Your subscription has been cancelled and will not renew. You'll continue to have access to Plus features until the end of your current billing period."
        );

        // Store previous subscription data for display purposes
        if (prevSubscription) {
          setSubscriptionData({
            has_subscription: false,
            subscription: {
              ...prevSubscription,
              status: "cancelled",
            },
          });
        }
      } else {
        message.error(response.data.error || "Failed to cancel subscription");
      }
    } catch (error: unknown) {
      console.error("Cancel subscription error:", error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          message.error("Session expired. Please login again.");
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        } else if (error.response?.status === 404) {
          message.error("No active subscription found");
        } else {
          message.error("Failed to cancel subscription. Please try again.");
        }
      } else {
        message.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsCancelling(false);
    }
  };

  const showCancelledBadge =
    !hasPlusPlan() &&
    subscriptionCancelled &&
    subscriptionData.subscription?.status === "cancelled";

  const billingLabel = hasPlusPlan()
    ? subscriptionData.subscription?.plan_type === "monthly"
      ? "monthly billing"
      : subscriptionData.subscription?.plan_type === "yearly"
        ? "yearly billing"
        : ""
    : undefined;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                fAIshion.AI
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <AccountSidebar activeTab="subscription" />

          <div className="flex-1">
            <div className="mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Subscription
                </h1>
              </div>
            </div>

            {isSubscriptionLoading ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
                </div>
              </div>
            ) : subscriptionError ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <p className="text-red-800">
                    Error loading subscription information: {subscriptionError}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                {/* Cancellation Notice */}
                {subscriptionCancelled && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertTriangle
                          className="h-5 w-5 text-amber-400"
                        />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-amber-800">
                          Subscription Cancelled
                        </h3>
                        <div className="mt-2 text-sm text-amber-700">
                          <p>
                            Your subscription has been cancelled. You'll
                            continue to have access to Plus features until the
                            end of your current billing period.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Header Section */}
                <SubscriptionHeader
                  hasPlusPlan={hasPlusPlan()}
                  showCancelledBadge={showCancelledBadge}
                  billingLabel={billingLabel}
                  amountCents={subscriptionData.subscription?.amount}
                  currency={subscriptionData.subscription?.currency || "usd"}
                  formatCurrency={formatCurrency}
                />

                {/* Stats Section */}
                <StatsCards
                  isQuotaLoading={isQuotaLoading}
                  hasPlusPlan={hasPlusPlan()}
                  daysUntilRenewal={calculateDaysUntilRenewal()}
                  freeTryOnQuota={quotaData?.freeTryOnQuota ?? 0}
                  credits={quotaData?.credits ?? 0}
                  hasPremiumAccess={hasPremiumAccess()}
                  monthlyUsage={quotaData?.monthlyUsage ?? 0}
                  monthlyLimit={quotaData?.monthlyLimit ?? 0}
                  monthlyRemaining={quotaData?.monthlyRemaining ?? 0}
                />


                {/* Actions Section */}
                {/* <div className="flex justify-between items-center">
                  <Link>Manage Billing & Invoices</Link>
                </div> */}
              </div>
            )}

            {/* Upgrade Plans Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Upgrade to a Higher Plan
                </h2>
              </div>

              <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 w-full">
                <FreePlanCard
                  hasPlusPlan={hasPlusPlan()}
                  onDowngrade={() => setShowCancelConfirm(true)}
                />
                <PlusPlanCard
                  amountDisplay={getSelectedAmountDisplay()}
                  priceLabel={getSelectedPriceLabel()}
                  billingCycle={billingCycle}
                  onBillingChange={setBillingCycle}
                  isPlansLoading={isPlansLoading}
                  description={selectedPlan?.description}
                  hasPlusPlan={hasPlusPlan()}
                  onChoosePlan={() => handleChoosePlan(billingCycle)}
                  isLoading={isLoading}
                  isDisabled={isLoading || isSubscriptionLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Subscription Confirmation Modal */}
      <CancelSubscriptionModal
        open={showCancelConfirm}
        isCancelling={isCancelling}
        onConfirm={handleCancelSubscription}
        onCancel={() => setShowCancelConfirm(false)}
      />
    </div>
  );
};

export default Subscription;