const {conditionCore} = require('../core/workflowCore');

const conditions = async (req, res) => {
  const { conditions, conditionTypes } = req.body;
  try {
    const result = await conditionCore(conditions, conditionTypes);
    res.status(200).json(result);
    res.end(); // 关闭连接
  } catch (error) {
    res.status(500).send(error.message);
  }
  
};

module.exports = {conditions};
