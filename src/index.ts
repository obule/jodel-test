import app from '@/api/app';

const port = process.env.PORT || 3000;
const start = async () => {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening on port ${port}`);
  });
};

start();
