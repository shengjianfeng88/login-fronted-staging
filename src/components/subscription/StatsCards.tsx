import React from "react";
import { Tooltip } from "antd";
import { Info, Shirt, Ruler } from "lucide-react";

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
    // 计算每日配额：freeTryOnQuota 表示 try-on 次数，size recommendations 是 try-on 的 5 倍
    const dailyTryOns = isQuotaLoading ? "-" : String(freeTryOnQuota ?? 0);
    const dailySizeRecs = isQuotaLoading ? "-" : String((freeTryOnQuota ?? 0) * 5);

    // 计算每月配额：10次试穿和50次尺码推荐
    const monthlyTryOns = isQuotaLoading ? "-" : String(Math.floor((credits ?? 0) / 10));
    const monthlySizeRecs = isQuotaLoading ? "-" : String(credits ?? 0);

    return (
        <div className={`grid grid-cols-1 ${hasPlusPlan ? "sm:grid-cols-3" : "sm:grid-cols-1"} gap-6 mb-4 mt-4`}>
            {hasPlusPlan ? (
                <>
                    {/* 每月配额卡片 */}
                    <div className="bg-gradient-to-br from-blue-50 via-[#C7C0F0]/40 to-pink-50 rounded-xl p-6 flex flex-col h-full">
                        <div className="text-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Monthly Quota</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Shirt className="h-5 w-5 text-brand-primary" />
                                    <span className="text-gray-700">Try-ons</span>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-brand-primary">{monthlyTryOns}</div>
                                    <div className="text-xs text-gray-500">per month</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Ruler className="h-5 w-5 text-brand-primary" />
                                    <span className="text-gray-700">Size Recs</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-brand-primary">{monthlySizeRecs}</div>
                                    <div className="text-xs text-gray-500">per month</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-gray-200">
                            <div className="text-xs text-gray-500 inline-flex items-center justify-center gap-1 w-full">
                                <span>Paid users get additional quota</span>
                                <Tooltip
                                    title={
                                        <div>
                                            <div>Daily free quota is consumed first</div>
                                            <div>Then monthly quota is used</div>
                                        </div>
                                    }
                                >
                                    <Info className="h-3 w-3 text-gray-400 cursor-help" />
                                </Tooltip>
                            </div>
                        </div>
                    </div>

                    {/* 每日配额卡片 */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col h-full">
                        <div className="text-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Daily Free Quota</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Shirt className="h-5 w-5 text-brand-primary" />
                                    <span className="text-gray-700">Try-ons</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-brand-primary">{dailyTryOns}</div>
                                    <div className="text-xs text-gray-500">per day</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Ruler className="h-5 w-5 text-brand-primary" />
                                    <span className="text-gray-700">Size Recs</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-brand-primary">{dailySizeRecs}</div>
                                    <div className="text-xs text-gray-500">per day</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-gray-200">
                            <div className="text-xs text-gray-500 text-center">
                                Resets at 00:00 UTC
                            </div>
                        </div>
                    </div>

                    {/* 续费时间卡片 */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-center items-center text-center h-full">
                        <div className="text-4xl font-bold text-brand-primary mb-1">
                            {`${daysUntilRenewal ?? 0} days`}
                        </div>
                        <div className="text-gray-500">Until Renewal</div>
                    </div>
                </>
            ) : (
                <>
                    {/* 免费用户配额卡片 - 与付费用户样式保持一致 */}
                    <div className="bg-gradient-to-br from-blue-50 via-[#C7C0F0]/40 to-pink-50 rounded-xl p-6 flex flex-col h-full">
                        <div className="text-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Free Plan Quota</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col items-center justify-center pr-4 border-r border-gray-300">
                                <div className="flex items-center gap-2 mb-2">
                                    <Shirt className="h-5 w-5 text-brand-primary" />
                                    <span className="text-gray-700">Try-ons</span>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-brand-primary">{dailyTryOns}</div>
                                    <div className="text-xs text-gray-500">per day</div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center pl-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Ruler className="h-5 w-5 text-brand-primary" />
                                    <span className="text-gray-700">Size Recs</span>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-brand-primary">{dailySizeRecs}</div>
                                    <div className="text-xs text-gray-500">per day</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-gray-200">
                            <div className="text-xs text-gray-600 space-y-1 mb-3">
                                <div className="flex items-center justify-center">
                                    <span>2 try-ons and 10 size recommendations per day</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span>10 try-ons and 50 size recommendations per month</span>
                                </div>
                            </div>
                            <div className="text-xs text-gray-500 text-center">
                                Resets at 00:00 UTC
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default StatsCards;


