const json = 
[{
  "code": "R1",
  "condition": "C1+C2+C3",
  "consequence": "G1+G2",
  "thresholdFlag": false
}]
;

let str = JSON.stringify(json);
str = str.replaceAll("\"","\\\"");
console.log(str);