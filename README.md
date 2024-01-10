This application will allow users to donate to organizations using block chain and smart contracts.


# Technology Stack

With :

- [Remix](https://github.com/remix-run/remix)
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss)
- [Prisma](https://github.com/prisma/prisma)
- [HardHat](https://hardhat.org/)
- [Alchemy](https://docs.alchemy.com/)

## To run

- Clone repo
- create postgres db
- You can create your own testnet app following this article: [link](https://docs.alchemy.com/docs/how-to-deploy-a-smart-contract-to-the-sepolia-testnet)
- create .env like the .env.example in the root directory and provide values for db url and api and wallet keys
- Run the following commands to set up: 

```sh
//install dependencies
npm i  

// run migrations on db
npx prisma migrate dev 

//deploy donation contract
cd ./server/crypto 
npx hardhat compile
npm hardhat run ./deploy-contract.ts
```

Note the address returned after running deploy contract. Add a contract with this address and name: 'Donation' in db.

Then finally run: 
```sh
npm run dev
```

The application will start running