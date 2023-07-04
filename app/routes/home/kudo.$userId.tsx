// app/routes/home/kudo.$userId.tsx

import { json, LoaderFunction, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { getUserById } from '~/utils/user.server';
import { Portal } from '~/components/portal';

export const loader: LoaderFunction = async ({ request, params }) => {
  const { userId } = params;

  if (typeof userId !== 'string') {
    return redirect('/home');
  }

  const recipient = await getUserById(userId);
  return json({ recipient });
};

export default function KudoModal() {
  const data = useLoaderData();
  return (
    <Portal wrapperId='kudo-modal'>
      <h2>
        User: {data.recipient.profile.firstName}{' '}
        {data.recipient.profile.lastName}
      </h2>
    </Portal>
  );
}