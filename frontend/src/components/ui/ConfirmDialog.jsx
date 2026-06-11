import Modal from "./Modal";
import Button from "./Button";
import useUiStore from "../../store/uiStore";

const ConfirmDialog = () => {
    const { confirmModal, closeConfirm } = useUiStore();
    const { isOpen, title, message, onConfirm } = confirmModal;

    const handleConfirm = () => {
        if (onConfirm) onConfirm();
        closeConfirm();
    };

    return (
        <Modal isOpen={isOpen} onClose={closeConfirm} title={title} width="400px">
            <p style={{
                color: "var(--color-muted)",
                fontSize: "0.9rem",
                marginBottom: "1.5rem",
                lineHeight: 1.6,
            }}>
                {message}
            </p>

            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                <Button variant="ghost" size="sm" onClick={closeConfirm}>
                    Cancel
                </Button>
                <Button variant="danger" size="sm" onClick={handleConfirm}>
                    Confirm
                </Button>
            </div>
        </Modal>
    );
};

export default ConfirmDialog;