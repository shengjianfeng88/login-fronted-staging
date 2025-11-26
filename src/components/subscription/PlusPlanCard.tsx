import React from "react";
import PlanFeature from "@/components/subscription/PlanFeature";
import BillingCycleToggle from "@/components/subscription/BillingCycleToggle";

type BillingCycle = "monthly" | "annual";

type PlusPlanCardProps = {
    amountDisplay: string;
    priceLabel: string;
    billingCycle: BillingCycle;
    onBillingChange: (cycle: BillingCycle) => void;
    isPlansLoading: boolean;
    description?: string;
    hasPlusPlan: boolean;
    onChoosePlan: () => void;
    isLoading: boolean;
    isDisabled: boolean;
};

const PlusPlanCard: React.FC<PlusPlanCardProps> = ({
    amountDisplay,
    priceLabel,
    billingCycle,
    onBillingChange,
    isPlansLoading,
    description,
    hasPlusPlan,
    onChoosePlan,
    isLoading,
    isDisabled,
}) => {
    return (
        <div className="bg-[#C7C0F0]/20 rounded-2xl border-2 border-brand-secondary p-8 w-full max-w-md flex flex-col h-full min-h-[600px] relative">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Plus Plan</h2>
            <div className="flex items-baseline gap-2 mb-4">
                <p className="text-4xl font-bold text-gray-900">{amountDisplay}</p>
                <p className="text-lg font-medium text-gray-500">{priceLabel}</p>
            </div>

            <BillingCycleToggle billingCycle={billingCycle} onChange={onBillingChange} />

            <hr className="my-4" />
            <p className="text-sm font-medium text-gray-600 mb-6">
                Premium features {billingCycle === "annual" && <span className="text-brand-primary font-bold"> (Save 10% billed yearly)</span>}
            </p>

            <div className="space-y-4 flex-grow mb-8">
                <PlanFeature included={true} text="Maximum monthly try-ons" />
                <PlanFeature included={true} text="No Queue" />
                <PlanFeature included={true} text="Full History Access" />
                <PlanFeature included={true} text="Custom Background Prompts" />
                <PlanFeature included={true} text="Ad Free" />
            </div>
            {hasPlusPlan ? (
                <button className="w-full bg-brand-primary text-white py-3 rounded-lg font-medium cursor-not-allowed">
                    Current Plan
                </button>
            ) : (
                <button
                    onClick={onChoosePlan}
                    disabled={isDisabled}
                    className="w-full bg-brand-primary hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors"
                >
                    {isLoading ? "Processing..." : "Upgrade"}
                </button>
            )}
        </div>
    );
};

export default PlusPlanCard;


