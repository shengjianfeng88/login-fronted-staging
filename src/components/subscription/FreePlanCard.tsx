import React from "react";
import PlanFeature from "@/components/subscription/PlanFeature";

type FreePlanCardProps = {
    hasPlusPlan: boolean;
    onDowngrade: () => void;
};

const FreePlanCard: React.FC<FreePlanCardProps> = ({ hasPlusPlan, onDowngrade }) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-md flex flex-col h-full min-h-[600px]">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Free Plan</h2>
            <p className="text-4xl font-bold text-gray-900 mb-1">
                $0 <span className="text-lg font-medium text-gray-500">per month</span>
            </p>
            <hr className="my-6" />
            <p className="text-sm font-medium text-gray-600 mb-6">Always free</p>
            <div className="space-y-4 flex-grow mb-8">
                <PlanFeature included={true} text="50 credits / month" />
                <PlanFeature included={true} text="~10 try-ons (5 credits each)" />
                <PlanFeature included={true} text="~50 size recs (1 credit each)" />
                <PlanFeature included={true} text="Limited History (last 5 items)" />
                <PlanFeature included={true} text="Basic Prompts" />
                <PlanFeature included={false} text="Ads shown" />
            </div>
            {!hasPlusPlan ? (
                <button className="w-full bg-gray-200 text-gray-500 py-3 rounded-lg font-medium cursor-not-allowed">
                    Current Plan
                </button>
            ) : (
                <button
                    onClick={onDowngrade}
                    className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 rounded-lg font-medium transition-colors"
                >
                    Downgrade
                </button>
            )}
        </div>
    );
};

export default FreePlanCard;


