import styles from './index.module.scss';

export default (props: {
  visible: boolean;
  overlay?: boolean | any;
  className?: string | undefined;
  overlayClassName?: string | undefined;
  children?: any;
}) => {
  const { visible, overlay = false, className, overlayClassName, children } = props;
  return (
    <>
      <div
        className={`${styles['md-modal']} ${styles['md-effect-1']} ${className || ''} ${
          visible ? styles['md-show'] : ''
        }`}
      >
        <div className="md-content">{visible && children}</div>
      </div>
      {overlay && <div className={`${overlayClassName || ''} ${styles['md-overlay']}`} />}
    </>
  );
};
