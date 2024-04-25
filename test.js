// for node.js before v21, you can use node-fetch package
// import fetch from 'node-fetch'

const promotionRequirement = `
必选纽崔莱®多种植物蛋白粉770克1件（产品编号：87272）1件+享瘦产品池满1500元及以上（产品编号：86456，86457，86458，86459，87243），则可获赠健身环一个（10294）和 畅快享瘦礼一件（10280）
`

const user = `
<role>
角色：你是【促销活动运营团队】-活动需求分析师，负责依据<rule>中的规则检查用户输入促销活动要求是否完整(任一不通过，都算不通过)，并以JSON格式回复（回应格式见<response>中说明）。
如果满足规范，请以<success>中的要求回复；否则以<fail>中的要求回复。
</role>

<response>
如果满足规范，则回复以下内容：
<success>
{
  "result": "success",
  "promotionName":"{{promotionName}}",
  "startDate":{{promotionStartDatetime}},
   "endDate":{{promotionEndDatetime}}
}
</success>

其中{{promotionName}}是促销活动名称（用户应该有一个明确的促销活动名称，而不需要你总结，如果没有，则不满足规范，需要用户补充）；
{{promotionStartDatetime}}是促销活动的开始日期时间，格式YYYY-MM-DD Hi24:mi:ss（用户应该有一个明确的促销活动名称，而不需要你总结，如果没有，则不满足规范，需要用户补充）；
{{promotionEndDatetime}}是促销活动的结束日期时间，格式YYYY-MM-DD Hi24:mi:ss（结束日期可以不提供）


如果不满足规范，则回复以下内容：
<fail>
{
   "result": "fail",
  "agent_message": "{error}"
 }
 </fail>
 其中{error}解释不满足<rule>中哪点，需要用户补充相关资料。
</response>

<rule>
1.给出的促销条件描述是否清楚表达要购买什么，即商品范围是否清楚。
2.给出的促销条件描述是否清楚表达在商品范围内要购买的条件数量 或 条件金额。（数量 或 金额二选一即可，或两者都有也可）
3.给出的商品范围是否有具体的产品编号。
4.是否有给出促销活动名称。
5.是否有活动开始日期时间。
</rule>

请以JSON格式回复，不用回复其他。
促销要求：${promotionRequirement}\n
`;



const content = `
请以JSON格式回复，不用回复其他。
促销要求：${promotionRequirement}\n
`

// const main = async()=>{
//   const API_KEY = "d37tSFnZgzdfDIvOWusEi9qc0PUucTI5";
//   const response = await fetch('https://api.deepinfra.com/v1/openai/chat/completions', {
//       method: 'POST',
//       body: JSON.stringify({
//           model: "meta-llama/Meta-Llama-3-70B-Instruct",
//           // messages: [{role: '你是一个历史学家，用中文回复我的问题', content: '请你介绍唐朝的历史'}],
//           messages: [{role: 'user', content: user}],
//           max_tokens: 51200,
//       }),
//       headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${API_KEY}`,
//       }
//   });
//   const data = await response.json();
  
//   console.log(data.choices[0].message.content);
//   // console.log(data.usage.prompt_tokens, data.usage.completion_tokens);
// }


// main();














const OPENROUTER_API_KEY = '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';

const main = async()=>{
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
    // "HTTP-Referer": `${YOUR_SITE_URL}`, // Optional, for including your app on openrouter.ai rankings.
    // "X-Title": `${YOUR_SITE_NAME}`, // Optional. Shows in rankings on openrouter.ai.
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "model": "anthropic/claude-2.1",
    "messages": [
      {"role": "user", "content": user},
    ],
  })
  
});
  const data = await response.json();
  console.log(JSON.stringify(data.choices[0].message));
  // console.log(data);
}

main();