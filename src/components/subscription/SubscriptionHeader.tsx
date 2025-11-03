import React from "react";
import { Crown } from "lucide-react";

type SubscriptionHeaderProps = {
    hasPlusPlan: boolean;
    showCancelledBadge: boolean;
    billingLabel?: string;
    amountCents?: number;
    currency?: string;
    formatCurrency: (amount: number, currency: string) => string;
};

const SubscriptionHeader: React.FC<SubscriptionHeaderProps> = ({
    hasPlusPlan,
    showCancelledBadge,
    billingLabel,
    amountCents,
    currency,
    formatCurrency,
}) => {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2">
            <div className="flex items-center gap-4">
                {hasPlusPlan && (
                    <div className="bg-brand-secondary text-brand-primary p-3 rounded-full">
                        <Crown size={28} />
                    </div>
                )}
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        {hasPlusPlan ? "Plus Plan" : "Free Plan"}
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                        {hasPlusPlan ? (
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                                Active
                            </span>
                        ) : showCancelledBadge ? (
                            <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold">
                                Cancelled
                            </span>
                        ) : (
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                                Active
                            </span>
                        )}
                        {hasPlusPlan ? (
                            <span className="text-gray-500 text-sm">{billingLabel}</span>
                        ) : (
                            <span className="text-gray-500 text-sm">
                                You are currently on a basic plan with basic features
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className="text-right mt-4 sm:mt-0">
                <div className="text-3xl font-bold text-gray-800">
                    {hasPlusPlan
                        ? formatCurrency(amountCents || 0, (currency || "usd").toUpperCase())
                        : "$0"}
                </div>
                <div className="text-gray-500 text-sm">per month</div>
            </div>
        </div>
    );
};

export default SubscriptionHeader;


