'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEventHandler, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { IoIosArrowBack } from 'react-icons/io';
import { prisma } from '@/prisma/prisma-client';

export default function SignUp() {
  const session = useSession();
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSignUp: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!name || !email || !password) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
      });

      return;
    }

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!res.ok) {
        toast({
          title: 'Ошибка',
          description: 'Не удалось создать аккаунт',
        });

        return;
      }

      toast({
        title: 'Успех',
        description: 'Аккаунт создан',
      });

      router.push('/');
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось создать аккаунт',
      });
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSignUp}
        className="flex flex-col gap-4 items-center justify-center h-screen w-screen"
      >
        <div className="relative border-2 flex flex-col gap-4 items-center justify-center rounded-xl p-6">
          <IoIosArrowBack
            color="#aaa"
            className="absolute cursor-pointer top-4 left-4"
            onClick={() => router.back()}
          />
          <h1 className="text-xl">Регистрация</h1>
          <Input className="w-300" ref={nameRef} type="text" placeholder="Имя" id="name" required />
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
          <Button type="submit">Создать аккаунт</Button>
        </div>
      </form>
    </div>
  );
}
