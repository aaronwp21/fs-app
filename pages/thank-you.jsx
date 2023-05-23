import Head from 'next/head';
import { useRouter } from 'next/router';

import Layout from '@/components/Layout';
import Heading from '@/components/Heading';
import Paragraph from '@/components/Paragraph';

export default function ThankYouPage() {
  const router = useRouter();
  const {
    query: { receiptURL },
  } = router;
  return (
    <>
      <Head>
        <title>Order Confirmation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading component="h2">Thank you for your order!</Heading>
        <Paragraph>
          You can view a copy of your receipt <a href={receiptURL}>here</a>
        </Paragraph>
      </Layout>
    </>
  );
}
