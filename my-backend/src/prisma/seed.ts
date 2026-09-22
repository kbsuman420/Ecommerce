import { db } from "./db";

async function main() {
    console.log("Seeding database...");
    const roles = ['ADMIN', 'SELLER', 'CUSTOMER'];

    for(const roleName of roles) {
        const role = db.orm.public.Role.where({ role: roleName }).first();
        if(!role) {
            await db.orm.public.Role.create({
                role: roleName,
            });
            console.log(`Role ${roleName} created.`);
        } else {
            console.log(`Role ${roleName} already exists.`);
        }

    }
}