import { Modal as PModal, Button, Spin } from 'antd';
import './index.module.scss';

const Modal = (props) => {
  const { wrapClassName = '', onOk, onCancel, children, okButtonProps, ..._others } = props;
  return (
    <PModal
      wrapClassName={`py-modal-wrapper ${wrapClassName}`}
      onCancel={onCancel}
      {..._others}
      footer={
        <>
          {onOk && (
            <Button {...okButtonProps} onClick={onOk}>
              确定
            </Button>
          )}
          {onCancel && <Button onClick={onCancel}>取消</Button>}
        </>
      }
    >
      {children}
    </PModal>
  );
};

Modal.info = PModal.info;
Modal.success = PModal.success;
Modal.error = PModal.error;
Modal.warning = PModal.warning;
Modal.confirm = PModal.confirm;

interface modalProps {
  content?: React.ReactNode;
  onOk?: (...args: any[]) => any;
  onCancel?: (...args: any[]) => any;
}

Modal.delete = ({ content, onOk, onCancel }: modalProps) => {
  return PModal.confirm({
    title: '删除提示',
    content,
    centered: true,
    closable: true,
    okText: '确定',
    cancelText: '取消',
    className: 'py-modal-delete',
    onOk,
    onCancel,
  });
};

export default Modal;
