import React from "react";

type BillingCycle = "monthly" | "annual";

type BillingCycleToggleProps = {
    billingCycle: BillingCycle;
    onChange: (cycle: BillingCycle) => void;
};

const BillingCycleToggle: React.FC<BillingCycleToggleProps> = ({
    billingCycle,
    onChange,
}) => {
    return (
        <div
            className="flex items-center gap-2 mb-4"
            role="tablist"
            aria-label="Billing cycle"
        >
            <button
                type="button"
                onClick={() => onChange("monthly")}
                className={`${billingCycle === "monthly"
                    ? "bg-brand-primary text-white"
                    : "bg-white text-gray-700 border"
                    } px-4 py-1.5 rounded-full text-sm border-brand-secondary`}
                aria-pressed={billingCycle === "monthly"}
            >
                Monthly
            </button>
            <button
                type="button"
                onClick={() => onChange("annual")}
                className={`${billingCycle === "annual"
                    ? "bg-brand-primary text-white"
                    : "bg-white text-gray-700 border"
                    } px-4 py-1.5 rounded-full text-sm border-brand-secondary`}
                aria-pressed={billingCycle === "annual"}
            >
                Annual
            </button>
        </div>
    );
};

export default BillingCycleToggle;


