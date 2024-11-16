'use client';

import { Button } from '@/components/ui/button';
import { useSession, signIn, signOut } from 'next-auth/react';
import { FaGoogle, FaGithub, FaVk } from 'react-icons/fa';

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      {!session ? (
        <div className="flex flex-col items-center justify-center h-screen w-screen">
          <h1 className="text-center text-3xl">Чтобы пользоваться севрисом, войдите в аккаунт</h1>
          <div className="flex w-100 gap-4 mt-4 mb-6">
            <a href="/api/auth/signin">
              <Button>Войти</Button>
            </a>
            <a href="/registration">
              <Button>Зарегистрироваться</Button>
            </a>
          </div>
          <h1>Или войдите через:</h1>
          <div className="flex w-100 gap-4 mt-4">
            <Button variant={'outline'} onClick={() => signIn('github')}>
              <FaGithub />
              GitHub
            </Button>
            <Button variant={'outline'} onClick={() => signIn('github')}>
              <FaVk />
              ВК
            </Button>
            <Button variant={'outline'} onClick={() => signIn('google')}>
              <FaGoogle />
              Google
            </Button>
          </div>
        </div>
      ) : (
        <div className=" flex items-center justify-center h-screen w-screen flex-col">
          <div className="border-2 pt-8 pb-8 pr-8 pl-8 rounded-xl drop-shadow flex flex-col items-center justify-center">
            <img width={70} src={session.user?.image} alt="" />
            <h1 className="mt-4 mb-2 text-3xl font-bold">{session.user?.name}</h1>
            <p className="mb-4">{session.user?.email}</p>
            <div className="flex w-full justify-between">
              <Button onClick={() => signOut()}>Выйти</Button>
              <a href="/quiz">
                <Button>Пройти квиз</Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
