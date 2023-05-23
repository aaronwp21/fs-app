import Head from 'next/head'
import Layout from '@/components/Layout'
import Heading from '@/components/Heading'
import ContactForm from '@/components/forms/ContactForm'
import { sendEmail } from '@/lib/api-functions/client'

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading component='h2'>Contact Us</Heading>
        <ContactForm submitHandler={sendEmail} />
      </Layout>
    </>
  )
}
