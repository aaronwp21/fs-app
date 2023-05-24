import Head from "next/head";

import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";

import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getUserOrdersQuery } from "@/lib/api-functions/server/orders/queries";
import { USER_ORDERS_STORAGE_KEY } from "@/lib/tq/orders/settings";

import Layout from "@/components/Layout";
import Heading from "@/components/Heading";
import QueryBoundaries from "@/components/QueryBoundaries";
import BasketList from "@/components/BasketList";
import BasketTotal from "@/components/BasketTotal";

export default function OrdersPage() {
  return (
    <>
      <Head>
        <title>My Shop | Your Basket</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading component="h1">Your Basket</Heading>

        <QueryBoundaries>
          <BasketTotal />
        </QueryBoundaries>

        <QueryBoundaries>
          <BasketList deleteHandler={deleteHandler} />
        </QueryBoundaries>
      </Layout>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const { user } = await getSession(context.req, context.res);
    const orders = await getUserOrdersQuery(user.sub, false);

    const queryClient = new QueryClient();

    await queryClient.setQueryData(
      [USER_ORDERS_STORAGE_KEY],
      JSON.parse(JSON.stringify(orders))
    );

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  },
});