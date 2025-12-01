import React from "react";
import { Check, Zap, Star, MessageSquare, Clock, Shield } from "lucide-react";

type PlusPlanCardProps = {
    amountDisplay: string;
    priceLabel: string;
    isPlansLoading: boolean;
    description?: string;
    hasPlusPlan: boolean;
    onChoosePlan: () => void;
    isLoading: boolean;
    isDisabled: boolean;
};

const PlusPlanCard: React.FC<PlusPlanCardProps> = ({
    amountDisplay,
    isPlansLoading,
    hasPlusPlan,
    onChoosePlan,
    isLoading,
    isDisabled,
}) => {
    return (
        <div className="bg-white rounded-3xl border border-gray-200 p-8 w-full max-w-md flex flex-col h-full min-h-[600px] relative shadow-sm">
            {/* Recommended Tag */}
            <div className="absolute -top-4 -right-4 bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Recommended
            </div>

            <h2 className="text-3xl font-serif font-medium text-gray-900 mb-1">Pro</h2>
            <p className="text-gray-500 text-sm mb-6">Enthusiasts & Power Users</p>

            <div className="flex items-baseline gap-1 mb-6">
                <p className="text-5xl font-serif font-medium text-gray-900">{amountDisplay}</p>
                <p className="text-gray-500 text-lg">/ mo</p>
            </div>

            {/* Selection Box (Simulated) */}
            <div className="border-2 border-black rounded-xl p-4 mb-6 bg-gray-50 cursor-default">
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-[6px] border-black bg-white"></div>
                    <div>
                        <div className="font-bold text-gray-900">Pro Plus</div>
                        <div className="text-xs text-gray-500">More usage than free</div>
                    </div>
                </div>
            </div>

            {hasPlusPlan ? (
                <button className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-medium cursor-not-allowed opacity-80 mb-8">
                    Current Plan
                </button>
            ) : (
                <button
                    onClick={onChoosePlan}
                    disabled={isDisabled}
                    className="w-full bg-gray-900 hover:bg-black disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-medium transition-colors mb-8"
                >
                    {isLoading ? "Processing..." : "Get Pro Plus"}
                </button>
            )}

            <div className="space-y-4 flex-grow">
                <FeatureItem icon={<Zap size={18} className="text-indigo-500" />} text="Fast speed" />
                <FeatureItem icon={<Check size={18} className="text-indigo-500" />} text="Advanced size recs" />
                <FeatureItem icon={<Check size={18} className="text-indigo-500" />} text="Advanced deal matching" />
                <FeatureItem icon={<Shield size={18} className="text-indigo-500" />} text="No ads" />
                <FeatureItem icon={<Clock size={18} className="text-indigo-500" />} text="Access full try-on history archive" />
                <FeatureItem icon={<Star size={18} className="text-indigo-500" />} text="Advanced AI Model" />
                <FeatureItem icon={<MessageSquare size={18} className="text-indigo-500" />} text="Advanced Stylist chatbot" />
                <FeatureItem icon={<Star size={18} className="text-indigo-500" />} text="Early access new features" />
                <FeatureItem icon={<Zap size={18} className="text-indigo-500" />} text="Priority queue" />
            </div>

            <p className="text-xs text-gray-400 text-center mt-6 italic">*Limits apply</p>
        </div>
    );
};

const FeatureItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
    <div className="flex items-center gap-3">
        <div className="flex-shrink-0">{icon}</div>
        <span className="text-gray-700 text-sm">{text}</span>
    </div>
);

export default PlusPlanCard;


