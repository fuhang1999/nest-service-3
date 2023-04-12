/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-04-11 22:03:07
 * @LastEditTime: 2023-04-12 17:59:57
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\.cz-config.js
 */
module.exports = {
  types: [
    { value: 'feat', name: '✨ feat:       新特性、新功能' },
    { value: 'fix', name: '🐛 fix:        修复bug' },
    { value: 'docs', name: '📝 docs:       文档变更' },
    {
      value: 'style',
      name: '💄 style:      代码格式(不影响功能，例如空格、分号等格式修正)',
    },
    {
      value: 'refactor',
      name: '🔨 refactor:   代码重构(不包括 bug 修复、功能新增)',
    },
    { value: 'perf', name: '⚡️ perf:       性能优化' },
    { value: 'test', name: '✅ test:       添加、修改测试用例' },
    {
      value: 'chore',
      name: '🔧 chore:      对构建过程或辅助工具和库的更改(不影响源文件、测试用例)',
    },
    { value: 'revert', name: '⏪ revert:     回滚 commit' },
    { value: 'wip', name: '🤹 wip:        开发中' },
  ],
  // scope 类型（定义之后，可通过上下键选择）
  scopes: [
    ['auth', '身份验证 相关'],
    ['user', '用户 相关'],
    ['role', '角色 相关'],
    ['menu', '菜单 相关'],
    ['workbench', '工作台 相关'],
    ['deps', '项目依赖'],
    ['other', '其他修改'],
    // 如果选择 custom，后面会让你再输入一个自定义的 scope。也可以不设置此项，把后面的 allowCustomScopes 设置为 true
    ['custom', '以上都不是？我要自定义'],
  ].map(([value, description]) => {
    return {
      value,
      name: `${value.padEnd(30)} (${description})`,
    };
  }),
  messages: {
    type: '确保本次提交遵循 Angular 规范！选择你要提交的类型:',
    customScope: '请输入修改的范围(可选)',
    subject: '请简要描述提交(必填)',
    body: '请输入详细描述(可选)',
    footer: '请选择要关闭的issue(可选)',
    confirmCommit: '确认要使用以上信息提交？(y/n)',
  },
  // 设置只有 type 选择了 feat 或 fix，才询问 breaking message
  allowBreakingChanges: ['feat', 'fix'],

  // 跳过要询问的步骤
  skipQuestions: ['scope', 'body', 'breaking', 'footer'],

  subjectLimit: 100, // subject 限制长度
  breaklineChar: '|', // 换行符，支持 body 和 footer
};
