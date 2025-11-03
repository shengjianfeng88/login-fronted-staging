import React from "react";
import { Check, X } from "lucide-react";

type PlanFeatureProps = {
    included: boolean;
    text: string;
};

const PlanFeature: React.FC<PlanFeatureProps> = ({ included, text }) => (
    <div className="flex items-center gap-3">
        {included ? (
            <Check className="text-green-500 w-5 h-5 flex-shrink-0" />
        ) : (
            <X className="text-red-500 w-5 h-5 flex-shrink-0" />
        )}
        <span className="text-gray-700">{text}</span>
    </div>
);

export default PlanFeature;


