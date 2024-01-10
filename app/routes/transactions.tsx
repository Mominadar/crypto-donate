import { useActionData, useLoaderData, useSubmit } from '@remix-run/react';
import { MetaFunction } from '@remix-run/react/dist/routeModules'
import { LoaderArgs } from '@remix-run/server-runtime';
import { useEffect, useRef, useState } from 'react';
import Modal from '~/components/modal';
import Table from '~/components/transaction-table'
import { toast } from 'react-toastify';
import { getTransactions } from 'server/transaction.server';

export let meta: MetaFunction = () => {
  return {
    title: 'Remix Template',
  }
}

export const loader = async ({ request }: LoaderArgs) => {
  const transactions = await getTransactions();
  return { transactions };
};

export default function Transactions() {
  const { transactions } = useLoaderData<typeof loader>();
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const formRef = useRef<HTMLFormElement>(null);
  const data = useActionData();

  useEffect(() => {
    if (data?.error) {
      toast(data?.error, { type: 'error' });
    } else if (data?.success) {
      toast('Transaction created! ', { type: 'success' });
      setSelectedOrganization(null);
    }
  }, [data]);

  const submit = useSubmit();
  const handleSubmit = (event: any) => {
    try {
      event.preventDefault();
      if (!formRef.current || !selectedOrganization) {
        return;
      }
      const formData = new FormData(formRef.current);
      formData.append('organization_id', selectedOrganization);
      submit(formData, { method: 'post' });
    } catch (error: unknown) {
      return { error: 'Something went wrong! Try again!' };
    }
  };
  return <div>
    <Table rows={transactions} setSelectedOrganization={setSelectedOrganization} />
    {selectedOrganization && <Modal formRef={formRef}
      setSelectedOrganization={setSelectedOrganization} onSubmit={handleSubmit}
    />}
  </div>
}
