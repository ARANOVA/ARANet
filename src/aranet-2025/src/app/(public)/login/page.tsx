import { headers } from 'next/headers';
import { Metadata } from 'next';
import { Login } from '@/app/components';

export const metadata: Metadata = {
  title: {
    template: `Acceso - ${process.env.APP_TITLE} - ${process.env.APP_CLIENT}`,
    default: `${process.env.APP_TITLE} - ${process.env.APP_CLIENT}`,
  },
  description: process.env.APP_DESCRIPTION,
};

const PageLogin = async () => {
  const referer = (await headers()).get('referer') || undefined;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Login referer={referer} />
    </div>
  );
};
export default PageLogin;
