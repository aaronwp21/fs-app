import Head from 'next/head';
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

import Layout from '@/components/Layout';
import Heading from '@/components/Heading';
import QueryBoundaries from '@/components/QueryBoundaries';
import UserDisplay from '@/components/UserDisplay';

export default function ProfilePage({ ssd, sess }) {
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading component="h2">Profile</Heading>
        <QueryBoundaries>
          <UserDisplay user={ssd} />
        </QueryBoundaries>
      </Layout>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const session = await getSession(context.req, context.res);

    return {
      props: { ssd: session.user, sess: JSON.parse(JSON.stringify(session)) },
    };
  },
});
