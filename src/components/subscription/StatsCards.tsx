import React from "react";

type StatsCardsProps = {
    isQuotaLoading: boolean;
    availableCredits: number;
    hasPlusPlan: boolean;
    daysUntilRenewal: number | null;
};

const StatsCards: React.FC<StatsCardsProps> = ({
    isQuotaLoading,
    availableCredits,
    hasPlusPlan,
    daysUntilRenewal,
}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4 mt-4">
            <div className="bg-gradient-to-br from-blue-50 via-[#C7C0F0]/40 to-pink-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-brand-primary mb-1">
                    {isQuotaLoading ? "-" : availableCredits}
                </div>
                <div className="text-gray-500">Available Credits</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-brand-primary mb-1">
                    {hasPlusPlan ? `${daysUntilRenewal ?? 0} days` : "$0"}
                </div>
                <div className="text-gray-500">
                    {hasPlusPlan ? "Until Renewal" : "Monthly Cost"}
                </div>
            </div>
        </div>
    );
};

export default StatsCards;


