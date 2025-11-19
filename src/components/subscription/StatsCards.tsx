import React from "react";

type StatsCardsProps = {
  hasPremiumAccess: boolean; // 统一使用 hasPremiumAccess 判断是否有 premium 权限
  daysUntilRenewal: number | null;
  freeTryOnQuota: number;
  credits: number;
  monthlyUsage?: number; // 每月使用量
  monthlyLimit?: number; // 每月限制
  monthlyRemaining?: number; // 每月剩余
};

const StatsCards: React.FC<StatsCardsProps> = ({
  hasPremiumAccess,
  daysUntilRenewal,
  freeTryOnQuota,
  credits,
  monthlyUsage,
  monthlyLimit,
  monthlyRemaining,
}) => {
  // 计算每日配额：freeTryOnQuota 表示 try-on 次数
  const dailyTryOns = String(freeTryOnQuota ?? 0);

  return (
    <div className={`grid grid-cols-1 ${hasPremiumAccess ? "sm:grid-cols-3" : credits > 0 ? "sm:grid-cols-2" : "sm:grid-cols-1"} gap-6 mb-4 mt-4`}>
      {hasPremiumAccess ? (
        <>
          {/* 订阅积分卡片 */}
          <div className="bg-gradient-to-br from-blue-50 via-[#C7C0F0]/40 to-pink-50 rounded-xl p-6 flex flex-col h-full">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 ">Subscription Credits</h3>
            </div>

            <div className="flex flex-col items-center justify-center flex-1">
              <div className="text-3xl font-bold text-brand-primary">
                {String(credits ?? 0)}
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
                {String(freeTryOnQuota ?? 0)}
              </div>
              <div className="text-sm text-gray-600 mt-1">daily credits</div>
            </div>

            <div className="mt-auto pt-4">
              {monthlyLimit !== undefined && (
                <div className="text-xs text-gray-500 text-center mt-1">
                  {monthlyUsage ?? 0} / {monthlyLimit} credits used this month
                </div>
              )}
              <div className="text-xs text-gray-500 text-center">
                Resets at 00:00 UTC
              </div>
            </div>
          </div>

          {/* 续费时间卡片 - 不区分订阅状态 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-center items-center text-center h-full">
            <div className="text-4xl font-bold text-brand-primary mb-1">
              {`${daysUntilRenewal ?? 0} days`}
            </div>
            <div className="text-gray-500">Until Renewal</div>
          </div>
        </>
      ) : (
        <>
          {/* 免费用户积分卡片 - 统一显示风格 */}
          {credits > 0 && (
            <div className="bg-gradient-to-br from-blue-50 via-[#C7C0F0]/40 to-pink-50 rounded-xl p-6 flex flex-col h-full">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Credits</h3>
              </div>

              <div className="flex flex-col items-center justify-center flex-1">
                <div className="text-3xl font-bold text-brand-primary">
                  {String(credits)}
                </div>
                <div className="text-sm text-gray-600 mt-1">credits available</div>
              </div>

              <div className="mt-auto pt-4">
                <div className="text-xs text-gray-500 text-center">
                  From your referral bonus
                </div>
              </div>
            </div>
          )}

          {/* 免费用户配额卡片 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col h-full">
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
                  {String(monthlyRemaining ?? 0)}
                </div>
                <div className="text-xs text-gray-500">
                  of {String(monthlyLimit ?? 0)} left
                </div>
              </div>
            </div>

            <div className="mt-auto pt-4">
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


