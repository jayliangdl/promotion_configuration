const {conditionsCore} = require('../core/conditionsCore');

module.exports = async (req, res) => {
  const conditionsStr = 'conditionsStr' in req.query?req.query["conditionsStr"]:"";
  const conditionTypesStr = 'conditionTypesStr' in req.query?req.query["conditionTypesStr"]:"";

  try {
    const result = await conditionsCore(conditionsStr, conditionTypesStr);
    res.status(200).json(result);
    res.end(); // 关闭连接
  } catch (error) {
    res.status(500).send(error.message);
  }
  
};
