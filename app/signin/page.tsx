'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEventHandler, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { IoIosArrowBack } from 'react-icons/io';
// import { FormEventHandler } from 'react';

export default function SignIn() {
  const session = useSession();
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      return;
    }

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (!res?.ok) {
      console.log('error: ', res, res?.error);
      console.log(session);
      toast({
        title: 'Ошибка авторизации',
        description: 'Введен неверный логин или пароль',
      });
    } else {
      router.push('/');
      console.log(session);
      toast({
        title: 'Добро пожаловать!',
        description: 'Вы успешно вошли в свой аккаунт',
      });
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center justify-center h-screen w-screen"
      >
        <div className="relative border-2 flex flex-col gap-4 items-center justify-center rounded-xl p-6">
          <IoIosArrowBack
            color="#aaa"
            className="absolute cursor-pointer top-4 left-4"
            onClick={() => router.back()}
          />
          <h1 className="text-xl">Вход</h1>
          <Input
            className="w-300"
            ref={emailRef}
            type="email"
            placeholder="Email"
            id="email"
            required
          />
          <Input
            className="w-300"
            ref={passwordRef}
            type="password"
            placeholder="Пароль"
            required
          />
          <Button type="submit">Войти</Button>
        </div>
      </form>
    </div>
  );
}
