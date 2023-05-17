import React, { useMemo } from 'react';
import { isAuth } from '@/util/tools';

interface AuthComponentProps {
  code: string;
  noAuthContent?: React.ReactNode;
  children?: React.ReactNode;
}

const AuthComponent = ({ code, noAuthContent, children }: AuthComponentProps) => {
  const auth = useMemo(() => (!code ? true : isAuth(code)), [code]);
  if (!auth) {
    return <>{noAuthContent}</> || null;
  } else {
    return <>{children}</>;
  }
};

export default AuthComponent;
