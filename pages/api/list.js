import groupby from 'lodash.groupby';
import { DB_NAME, FEATURE_TYPE } from '../../lib/const';
import { zrevrange } from '@upstash/redis';

module.exports = async (req, res) => {
  try {
    const { data, error } = await zrevrange(DB_NAME, 0, -1, {
      withScores: true,
    });
    if (error) throw error;

    let result = [];
    for (let i = 0; i < data.length - 1; i += 2) {
      let item = {};
      const { title, createdAt, user, status } = JSON.parse(data[i]);
      item['title'] = title;
      item['user'] = user;
      item['createdAt'] = createdAt;
      item['status'] = status;
      item['score'] = data[i + 1];
      result.push(item);
    }

    const dataGroupBy = groupby(result, 'status');

    if (!dataGroupBy[FEATURE_TYPE.REQUEST]) {
      dataGroupBy[FEATURE_TYPE.REQUEST] = [];
    }
    if (!dataGroupBy[FEATURE_TYPE.RELEASED]) {
      dataGroupBy[FEATURE_TYPE.RELEASED] = [];
    }

    res.json(dataGroupBy);
  } catch (error) {
    res.status(400).json({ error });
  }
};
