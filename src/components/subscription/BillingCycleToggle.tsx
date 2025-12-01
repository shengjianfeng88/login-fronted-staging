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
        <div className="flex justify-center w-full mb-8">
            <div className="bg-gray-100 p-1 rounded-full inline-flex items-center">
                <button
                    type="button"
                    onClick={() => onChange("monthly")}
                    className={`${billingCycle === "monthly"
                        ? "bg-black text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                        } px-6 py-2 rounded-full text-sm font-medium transition-all duration-200`}
                >
                    Monthly
                </button>
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => onChange("annual")}
                        className={`${billingCycle === "annual"
                            ? "bg-black text-white shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                            } px-6 py-2 rounded-full text-sm font-medium transition-all duration-200`}
                    >
                        Yearly
                    </button>
                    {/* Discount Tag */}
                    <div className="absolute -top-3 -right-10 bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full border border-green-200">
                        -17%
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillingCycleToggle;


