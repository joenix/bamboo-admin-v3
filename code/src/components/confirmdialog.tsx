import {
  useEffect,
  useState,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "../utils/dep";

const ConfirmDialog = ({ open, onClose, onConfirm, title, description }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(open);
  }, [open]);

  // 取消
  const handleCancel = () => {
    setVisible(false);
    onClose && onClose();
  };

  // 确认
  const handleConfirm = () => {
    setVisible(false);
    onConfirm && onConfirm();
  };
  return (
    <Dialog open={visible} onClose={onClose}>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          取消
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          确认
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
