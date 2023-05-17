import './index.module.scss';

const ErrorComponent = (props) => {
  const { err } = props;

  function refresh() {
    window.location.reload();
  }
  return (
    <div className="error-message">
      <h2>抱歉,系统出现问题.</h2>
      <div className="error-text">{err && JSON.stringify(err)}</div>
      <div className="error-refresh" onClick={() => refresh}>
        重新刷新浏览器
      </div>
    </div>
  );
};

export default ErrorComponent;
