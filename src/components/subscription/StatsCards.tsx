import React from "react";
import { Tooltip } from "antd";
import { Info } from "lucide-react";

type StatsCardsProps = {
    isQuotaLoading: boolean;
    hasPlusPlan: boolean;
    daysUntilRenewal: number | null;
    freeTryOnQuota: number;
    credits: number;
};

const StatsCards: React.FC<StatsCardsProps> = ({
    isQuotaLoading,
    hasPlusPlan,
    daysUntilRenewal,
    freeTryOnQuota,
    credits,
}) => {
    const dailyFreeCredits = isQuotaLoading ? "-" : String((freeTryOnQuota ?? 0) * 5);
    const monthlyCredits = isQuotaLoading ? "-" : String(credits ?? 0);

    return (
        <div className={`grid grid-cols-1 ${hasPlusPlan ? "sm:grid-cols-3" : "sm:grid-cols-2"} gap-6 mb-4 mt-4`}>
            {hasPlusPlan ? (
                <>
                    <div className="bg-gradient-to-br from-blue-50 via-[#C7C0F0]/40 to-pink-50 rounded-xl p-6 text-center">
                        <div className="text-4xl font-bold text-brand-primary mb-1">
                            {monthlyCredits}
                        </div>
                        <div className="text-gray-500 inline-flex items-center justify-center gap-1">
                            <span>Available Credits (month)</span>
                            <Tooltip
                                title={
                                    <div>
                                        <div>For paid users, Daily Free Credits are consumed first.</div>
                                    </div>
                                }
                            >
                                <Info className="h-4 w-4 text-gray-400 cursor-help" />
                            </Tooltip>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                        <div className="text-4xl font-bold text-brand-primary mb-1">
                            {dailyFreeCredits}
                        </div>
                        <div className="text-gray-500 inline-flex items-center justify-center gap-1">
                            <span>Daily Free Credits (reset 00:00 UTC)</span>
                            <Tooltip
                                title={
                                    <div>
                                        <div>Try-on: 5 credits per use</div>
                                        <div>Size Recommendation: 1 credit per use</div>
                                    </div>
                                }
                            >
                                <Info className="h-4 w-4 text-gray-400 cursor-help" />
                            </Tooltip>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                        <div className="text-4xl font-bold text-brand-primary mb-1">
                            {`${daysUntilRenewal ?? 0} days`}
                        </div>
                        <div className="text-gray-500">Until Renewal</div>
                    </div>
                </>
            ) : (
                <>
                    <div className="bg-gradient-to-br from-blue-50 via-[#C7C0F0]/40 to-pink-50 rounded-xl p-6 text-center">
                        <div className="text-4xl font-bold text-brand-primary mb-1">
                            {dailyFreeCredits}
                        </div>
                        <div className="text-gray-500 inline-flex items-center justify-center gap-1">
                            <span>Daily Free Credits (reset 00:00 UTC)</span>
                            <Tooltip
                                title={
                                    <div>
                                        <div>Try-on: 5 credits per use</div>
                                        <div>Size Recommendation: 1 credit per use</div>
                                    </div>
                                }
                            >
                                <Info className="h-4 w-4 text-gray-400 cursor-help" />
                            </Tooltip>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                        <div className="text-4xl font-bold text-brand-primary mb-1">
                            {"$0"}
                        </div>
                        <div className="text-gray-500">Monthly Cost</div>
                    </div>
                </>
            )}
        </div>
    );
};

export default StatsCards;


