import { useActionData, useLoaderData, useSubmit } from '@remix-run/react';
import { MetaFunction } from '@remix-run/react/dist/routeModules'
import { ActionArgs, LoaderArgs } from '@remix-run/server-runtime';
import { useEffect, useRef, useState } from 'react';
import Modal from '~/components/modal';
import Table from '~/components/organization-table'
import { toast } from 'react-toastify';
import { getOrganizations } from 'server/organization.server';
import { createTransaction } from 'server/transaction.server';

export let meta: MetaFunction = () => {
  return {
    title: 'Crypto Donate',
  }
}

export const loader = async ({ request }: LoaderArgs) => {
  const organizations = await getOrganizations();
  return { organizations };
};

export async function action({ request }: ActionArgs) {
  try {
    const body = await request.formData();
    return createTransaction(body);
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'Something went wrong! Try again!' };
  }
}


export default function Index() {
  const { organizations } = useLoaderData<typeof loader>();
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
    <Table rows={organizations} setSelectedOrganization={setSelectedOrganization} />
    {selectedOrganization && <Modal formRef={formRef}
      setSelectedOrganization={setSelectedOrganization} onSubmit={handleSubmit}
    />}
  </div>
}
