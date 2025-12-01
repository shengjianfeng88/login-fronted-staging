import React from "react";
import { Check, Minus } from "lucide-react";

type FreePlanCardProps = {
    hasPlusPlan: boolean;
    onDowngrade: () => void;
};

const FreePlanCard: React.FC<FreePlanCardProps> = ({ hasPlusPlan, onDowngrade }) => {
    return (
        <div className="bg-white rounded-3xl border border-gray-200 p-8 w-full max-w-md flex flex-col h-full min-h-[600px] shadow-sm">
            <h2 className="text-3xl font-serif font-medium text-gray-900 mb-1">Free</h2>
            <p className="text-gray-500 text-sm mb-6">Casual exploration</p>

            <div className="mb-6">
                <p className="text-5xl font-serif font-medium text-gray-900">$0</p>
            </div>

            {/* Starter Box */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="font-bold text-gray-900">Starter</div>
            </div>

            {!hasPlusPlan ? (
                <button className="w-full border border-gray-300 text-gray-700 py-3.5 rounded-xl font-medium hover:bg-gray-50 transition-colors mb-8">
                    Your Current Plan
                </button>
            ) : (
                <button
                    onClick={onDowngrade}
                    className="w-full border border-gray-300 text-gray-700 py-3.5 rounded-xl font-medium hover:bg-gray-50 transition-colors mb-8"
                >
                    Downgrade
                </button>
            )}

            <div className="space-y-4 flex-grow">
                <FeatureItem icon={<Check size={18} className="text-gray-700" />} text="Normal speed" />
                <FeatureItem icon={<Check size={18} className="text-gray-700" />} text="Basic size recs" />
                <FeatureItem icon={<Check size={18} className="text-gray-700" />} text="Basic deal matching" />
                <FeatureItem icon={<Check size={18} className="text-gray-700" />} text="Ad-supported" />
                <FeatureItem icon={<ClockIcon />} text="View limited try-on history" subtext="Older items saved securely" />
                <FeatureItem icon={<Minus size={18} className="text-gray-300" />} text="Basic AI Model" disabled />
                <FeatureItem icon={<Minus size={18} className="text-gray-300" />} text="Basic chatbot" disabled />
                <FeatureItem icon={<Minus size={18} className="text-gray-300" />} text="Limited features" disabled />
                <FeatureItem icon={<Minus size={18} className="text-gray-300" />} text="Standard queue" disabled />
            </div>
        </div>
    );
};

const FeatureItem = ({ icon, text, subtext, disabled }: { icon: React.ReactNode; text: string; subtext?: string; disabled?: boolean }) => (
    <div className={`flex items-start gap-3 ${disabled ? "text-gray-400" : "text-gray-700"}`}>
        <div className="flex-shrink-0 mt-0.5">{icon}</div>
        <div>
            <div className="text-sm">{text}</div>
            {subtext && <div className="text-xs text-gray-400 italic">{subtext}</div>}
        </div>
    </div>
);

const ClockIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

export default FreePlanCard;


