import { authenticate } from '../../lib/utils';
import { DB_NAME } from '../../lib/const';
import { sadd, zincrby } from '@upstash/redis';

export default authenticate(async (req, res) => {
  try {
    const { title, createdAt, user, status } = req.body;

    const FEATURE = JSON.stringify({ title, createdAt, user, status });

    const { data: saddData, error: saddError } = await sadd('s:' + FEATURE, [
      req.user.sub,
    ]);
    if (saddData === 0) throw 'You can not vote an item multiple times';
    if (saddError) throw saddError;

    const { data, error } = await zincrby(DB_NAME, 1, FEATURE);
    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(400).json({ error });
  }
});
