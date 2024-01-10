import { db } from "~/utils/db.server";

export async function getOrganizations(){
    const organizations = await db.organization.findMany({
    });
  return organizations; 
}