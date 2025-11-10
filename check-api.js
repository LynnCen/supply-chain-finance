// 快速测试API Mock是否工作
console.log('🔍 检查Mock数据...');

const mockData = require('./src/mocks/data/analysisReport.json');

console.log('\n✅ Mock数据检查:');
console.log('- 企业列表数量:', mockData.enterpriseList?.length || 0);
console.log('- 企业列表:', mockData.enterpriseList);

if (mockData.enterpriseList && mockData.enterpriseList.length > 0) {
  console.log('\n✅ 第一个企业信息:');
  console.log('  - ID:', mockData.enterpriseList[0].id);
  console.log('  - 名称:', mockData.enterpriseList[0].name);
  console.log('  - 信用等级:', mockData.enterpriseList[0].creditRating);
  
  console.log('\n✅ E001的信用评分数据:', mockData.creditScore?.E001?.month ? '存在' : '不存在');
  console.log('✅ E001的风险分析数据:', mockData.riskAnalysis?.E001?.month ? '存在' : '不存在');
} else {
  console.log('\n❌ 企业列表为空！');
}
