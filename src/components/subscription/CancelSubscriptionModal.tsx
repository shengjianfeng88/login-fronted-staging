import React from "react";
import { Modal } from "antd";

type CancelSubscriptionModalProps = {
    open: boolean;
    isCancelling: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

const CancelSubscriptionModal: React.FC<CancelSubscriptionModalProps> = ({
    open,
    isCancelling,
    onConfirm,
    onCancel,
}) => {
    return (
        <Modal
            title="Cancel Subscription"
            open={open}
            onOk={onConfirm}
            onCancel={onCancel}
            okText={isCancelling ? "Cancelling..." : "Yes, Cancel"}
            cancelText="Keep Subscription"
            okButtonProps={{
                loading: isCancelling,
                danger: true,
            }}
            width={480}
        >
            <div className="py-4">
                <p className="text-gray-600 mb-4">
                    Are you sure you want to cancel your Plus subscription?
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> Your subscription will remain active until the end of your current billing period. You'll continue to have access to all Plus features until then.
                    </p>
                </div>
            </div>
        </Modal>
    );
};

export default CancelSubscriptionModal;


