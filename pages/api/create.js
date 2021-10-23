import { authenticate } from '../../lib/utils';
import { string } from 'yup';
import { DB_NAME, FEATURE_TYPE } from '../../lib/const';
import { zadd } from '@upstash/redis';

export default authenticate(async (req, res) => {
  try {
    const { title } = req.body;

    let schema = string().required().trim().min(10).max(70);
    const isValid = await schema.isValid(title);

    if (!isValid) {
      throw 'Min 10 and Max 70 characters please.';
    }

    const { nickname, email, updated_at, ...user } = req.user;

    const FEATURE = {
      title,
      createdAt: Date.now(),
      user,
      status: FEATURE_TYPE.REQUEST,
    };

    const { error } = await zadd(DB_NAME, [0, JSON.stringify(FEATURE)], {
      nx: true,
    });
    if (error) throw error;

    res.json({ body: 'success' });
  } catch (error) {
    res.status(400).json({ error });
  }
});
