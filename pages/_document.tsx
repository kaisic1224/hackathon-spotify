import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href='https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;900&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body className='overflow-x-hidden min-h-screen bg-black-main'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
