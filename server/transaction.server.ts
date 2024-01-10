import { json } from "@remix-run/node";
import { db } from "~/utils/db.server";
import { sendTransaction } from "./crypto.server";

export async function getTransactions() {
    const transactions = await db.transaction.findMany({
        include: {
            organization: {
                select: {
                    name: true
                }
            }
        }
    });
    return transactions;
}

export async function createTransaction(body: any) {
    const name = body.get('name');
    const email = body.get('email');
    const amount = body.get('amount');
    const organizationId = body.get('organization_id');

    if (!name || !email || !amount || !organizationId) {
        throw new Error('Please provide required feilds!');
    }

    await db.transaction.create({
        data: {
            userName: name as string,
            userEmail: email as string,
            amount: Number(amount),
            organization:
                { connect: { id: Number(organizationId) } },
        },
    });
    await sendTransaction( Number(amount));
    return json({ success: true });
}