const getBaseUrl = () => {
  let url;
  console.log('LOOOKK', process.env.NODE_ENV);
  switch (process.env.NODE_ENV) {
    case 'production':
      url = 'https://part-of-speech.westeurope.cloudapp.azure.com';
      break;
    case 'development':
      url = 'http://localhost:4000';
      break;
    default:
      url = 'https://part-of-speech.westeurope.cloudapp.azure.com';
  }

  return url;
};

export default getBaseUrl;
