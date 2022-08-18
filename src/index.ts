import app from '@/api/app';

const start = async () => {
  app.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('Listening on port 3000!');
  });
};

start();
