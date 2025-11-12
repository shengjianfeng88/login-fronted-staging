import React from "react";

type StatsCardsProps = {
  isQuotaLoading: boolean;
  hasPlusPlan: boolean;
  daysUntilRenewal: number | null;
  freeTryOnQuota: number;
  credits: number;
  hasPremiumAccess: boolean; // 新增：基于 quotaData.userType 判断是否有 premium 权限
  monthlyUsage?: number; // 新增：每月使用量
  monthlyLimit?: number; // 新增：每月限制
  monthlyRemaining?: number; // 新增：每月剩余
};

const StatsCards: React.FC<StatsCardsProps> = ({
  isQuotaLoading,
  hasPlusPlan,
  daysUntilRenewal,
  freeTryOnQuota,
  credits,
  hasPremiumAccess,
  monthlyUsage,
  monthlyLimit,
  monthlyRemaining,
}) => {
  // 计算每日配额：freeTryOnQuota 表示 try-on 次数
  const dailyTryOns = isQuotaLoading ? "-" : String(freeTryOnQuota ?? 0);

  // 判断是否应该显示积分信息（有活跃订阅或有 premium 权限）
  const shouldShowCredits = hasPlusPlan || hasPremiumAccess;

  return (
    <div className={`grid grid-cols-1 ${shouldShowCredits ? "sm:grid-cols-3" : "sm:grid-cols-1"} gap-6 mb-4 mt-4`}>
      {shouldShowCredits ? (
        <>
          {/* 订阅积分卡片 */}
          <div className="bg-gradient-to-br from-blue-50 via-[#C7C0F0]/40 to-pink-50 rounded-xl p-6 flex flex-col h-full">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 ">Subscription Credits</h3>
            </div>

            <div className="flex flex-col items-center justify-center flex-1">
              <div className="text-3xl font-bold text-brand-primary">
                {isQuotaLoading ? "-" : String(credits ?? 0)}
              </div>
              <div className="text-sm text-gray-600 mt-1">credits available</div>
            </div>

            <div className="mt-auto pt-4">
              <div className="text-xs text-gray-500 text-center">
                From your subscription plan
              </div>
            </div>
          </div>

          {/* 赠送积分卡片 */}
          <div className="bg-gradient-to-br from-blue-50 via-[#C7C0F0]/40 to-pink-50 rounded-xl p-6 flex flex-col h-full">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 ">Gifted Credits</h3>
            </div>

            <div className="flex flex-col items-center justify-center flex-1">
              <div className="text-3xl font-bold text-brand-primary">
                {isQuotaLoading ? "-" : String(freeTryOnQuota ?? 0)}
              </div>
              <div className="text-sm text-gray-600 mt-1">daily credits</div>
            </div>

            <div className="mt-auto pt-4">
              {!isQuotaLoading && monthlyLimit !== undefined && (
                <div className="text-xs text-gray-500 text-center mt-1">
                  {monthlyUsage ?? 0} / {monthlyLimit} credits used this month
                </div>
              )}
              <div className="text-xs text-gray-500 text-center">
                Resets at 00:00 UTC
              </div>
            </div>
          </div>

          {/* 续费时间卡片 - 只对活跃订阅显示 */}
          {hasPlusPlan && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-center items-center text-center h-full">
              <div className="text-4xl font-bold text-brand-primary mb-1">
                {`${daysUntilRenewal ?? 0} days`}
              </div>
              <div className="text-gray-500">Until Renewal</div>
            </div>
          )}

          {/* 取消订阅后的提示卡片 - 只对取消订阅但有 premium 权限的用户显示 */}
          {!hasPlusPlan && hasPremiumAccess && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-center items-center text-center h-full">
              <div className="text-lg font-semibold text-gray-700 mb-1">
                Premium Access
              </div>
              <div className="text-sm text-gray-500">
                Until period ends
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {/* 免费用户配额卡片 - 与付费卡片样式保持一致 */}
          <div className="bg-gradient-to-br from-blue-50 via-[#C7C0F0]/40 to-pink-50 rounded-xl p-6 flex flex-col h-full">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Your Quota</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-1">
              {/* 每日余额 */}
              <div className="flex flex-col items-center justify-center">
                <span className="text-gray-700 text-sm mb-1">Daily Balance</span>
                <div className="text-2xl font-bold text-brand-primary">{dailyTryOns}</div>
                <div className="text-xs text-gray-500">try-ons left</div>
              </div>

              {/* 每月余额 */}
              <div className="flex flex-col items-center justify-center">
                <span className="text-gray-700 text-sm mb-1">Monthly Balance</span>
                <div className="text-2xl font-bold text-brand-primary">
                  {isQuotaLoading ? "-" : String(monthlyRemaining ?? 0)}
                </div>
                <div className="text-xs text-gray-500">
                  of {isQuotaLoading ? "-" : String(monthlyLimit ?? 0)} left
                </div>
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-200">
              {/* <div className="bg-white/60 rounded-lg p-3 mb-3">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-1">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                            <span className="text-gray-600">Daily Usage</span>
                                        </div>
                                        <span className="font-medium text-gray-800">
                                            {isQuotaLoading ? "-" : `${String(monthlyUsage ?? 0)} / ${String(monthlyLimit ?? 0)}`}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-1">
                                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                            <span className="text-gray-600">Monthly Usage</span>
                                        </div>
                                        <span className="font-medium text-gray-800">
                                            {isQuotaLoading ? "-" : `${String(monthlyUsage ?? 0)} / ${String(monthlyLimit ?? 0)}`}
                                        </span>
                                    </div>
                                </div>
                            </div> */}
              <div className="text-xs text-gray-500 text-center flex items-center justify-center gap-1">
                <span>Resets at 00:00 UTC</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StatsCards;


