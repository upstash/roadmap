import { authenticate } from '../../lib/utils';
import { DB_NAME } from '../../lib/const';
import { zrem } from '@upstash/redis';

export default authenticate(async (req, res) => {
  try {
    if (req.user.sub !== process.env.NEXT_PUBLIC_AUTH0_ADMIN_ID) {
      throw 'You need to be admin';
    }

    const { title, createdAt, user, status } = req.body;
    const FEATURE = JSON.stringify({ title, createdAt, user, status });

    const { data: zremData, error: zremError } = await zrem(
      DB_NAME,
      JSON.stringify(FEATURE)
    );
    if (zremData === 0) throw 'Invalid parameters';
    if (zremError) throw zremError;

    res.json({ body: 'success' });
  } catch (error) {
    res.status(400).json({ error });
  }
});
