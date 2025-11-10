# 滚动条样式使用指南

## 概述

项目中已经配置了全局统一的滚动条样式，所有滚动条都采用现代化、半透明的设计风格。

## 全局默认样式

所有滚动条默认使用以下特性：

- **宽度**: 8px (水平和垂直)
- **轨道**: 透明背景
- **滑块**: 半透明灰色 `rgba(155, 155, 155, 0.5)`
- **悬停**: 更深的灰色 `rgba(120, 120, 120, 0.7)`
- **动画**: 0.3s 平滑过渡
- **跨浏览器**: 支持 Firefox (`scrollbar-width`) 和 Webkit 浏览器

## 可用的滚动条样式类

### 1. `.scrollbar-thin` - 细滚动条

用于小型容器或需要节省空间的区域。

```tsx
<div className="tw-overflow-y-auto scrollbar-thin" style={{ maxHeight: '400px' }}>
  {/* 内容 */}
</div>
```

**特点:**

- 宽度: 6px
- 适用场景: 侧边栏、小卡片、下拉列表

**示例:**

- ✅ 企业热榜排行
- ✅ 小型数据列表
- ✅ 通知中心

---

### 2. `.scrollbar-primary` - 蓝色主题滚动条

用于重点展示区域或与主题色呼应的地方。

```tsx
<div className="tw-overflow-y-auto scrollbar-primary" style={{ maxHeight: '500px' }}>
  {/* 内容 */}
</div>
```

**特点:**

- 颜色: 蓝色 `rgba(22, 119, 255, 0.4)`
- 悬停: `rgba(22, 119, 255, 0.6)`
- 适用场景: 主要内容区、重点数据展示

**示例:**

- ✅ 主要数据表格
- ✅ 重要列表
- ✅ 关键信息面板

---

### 3. `.scrollbar-purple` - 紫色主题滚动条

用于特殊强调或配合紫色主题的区域。

```tsx
<div className="tw-overflow-y-auto scrollbar-purple" style={{ maxHeight: '500px' }}>
  {/* 内容 */}
</div>
```

**特点:**

- 颜色: 紫色 `rgba(114, 46, 209, 0.4)`
- 悬停: `rgba(114, 46, 209, 0.6)`
- 适用场景: 特殊功能区、VIP/高级功能

**示例:**

- ✅ 高级功能面板
- ✅ 特殊数据展示
- ✅ 强调区域

---

### 4. `.scrollbar-hidden` - 隐藏滚动条

隐藏滚动条但保持滚动功能，用于需要更简洁外观的地方。

```tsx
<div className="tw-overflow-y-auto scrollbar-hidden" style={{ maxHeight: '300px' }}>
  {/* 内容 */}
</div>
```

**特点:**

- 完全隐藏滚动条
- 保持滚动功能
- 适用场景: 轮播、特殊UI效果

**示例:**

- ✅ 图片轮播
- ✅ 横向滚动展示
- ✅ 触摸优先的移动端界面

---

## 自动应用的样式

以下组件已自动应用优化的滚动条样式，无需额外配置：

### Ant Design 表格

```tsx
<Table dataSource={data} columns={columns} scroll={{ x: 1200, y: 400 }} />
```

- 自动使用优化的滚动条样式
- 表格主体滚动区域有浅灰色轨道背景

### Ant Design Select 下拉框

```tsx
<Select options={options} />
```

- 下拉列表自动使用细蓝色滚动条
- 与主题色一致

---

## 使用建议

### ✅ 推荐做法

1. **小型容器使用细滚动条**

```tsx
<div className="tw-h-96 tw-overflow-y-auto scrollbar-thin">{/* 侧边栏或小列表 */}</div>
```

2. **重点区域使用彩色滚动条**

```tsx
<div className="tw-h-screen tw-overflow-y-auto scrollbar-primary">{/* 主内容区 */}</div>
```

3. **配合 Tailwind 类使用**

```tsx
<div className="tw-max-h-[500px] tw-overflow-auto scrollbar-thin tw-pr-2">
  {/* 内容 + 右侧间距避免内容贴边 */}
</div>
```

### ❌ 不推荐做法

1. **避免内联样式覆盖**

```tsx
// ❌ 不推荐
<div style={{
  scrollbarWidth: 'thin',
  scrollbarColor: '#ccc #fff'
}}>
```

2. **避免混用多个滚动条类**

```tsx
// ❌ 不推荐
<div className="scrollbar-thin scrollbar-primary scrollbar-purple">
```

3. **避免在无滚动的容器上使用**

```tsx
// ❌ 不推荐（无 overflow 属性）
<div className="scrollbar-thin">
```

---

## 浏览器兼容性

| 浏览器      | 支持情况                                               |
| ----------- | ------------------------------------------------------ |
| Chrome 90+  | ✅ 完全支持                                            |
| Safari 14+  | ✅ 完全支持                                            |
| Edge 90+    | ✅ 完全支持                                            |
| Firefox 64+ | ✅ 完全支持（使用 scrollbar-width 和 scrollbar-color） |
| Opera 76+   | ✅ 完全支持                                            |
| IE 11       | ⚠️ 使用默认滚动条（降级方案）                          |

---

## 实际应用案例

### 案例 1: 企业热榜排行（RankingBoard）

```tsx
<div className="tw-h-full tw-overflow-y-auto tw-pt-3 scrollbar-thin" style={{ maxHeight: '460px' }}>
  <List dataSource={rankings} />
</div>
```

**效果:**

- 细滚动条，节省空间
- 半透明设计，不抢视觉焦点
- 平滑的悬停效果

### 案例 2: 数据管理表格

```tsx
<Table dataSource={data} columns={columns} scroll={{ x: 1500, y: 600 }} />
```

**效果:**

- 自动应用优化的表格滚动条
- 浅灰色轨道，清晰可见滚动位置
- 与表格样式协调

### 案例 3: 消息通知面板

```tsx
<div className="tw-max-h-96 tw-overflow-y-auto scrollbar-primary">
  {messages.map(msg => (
    <MessageItem key={msg.id} {...msg} />
  ))}
</div>
```

**效果:**

- 蓝色主题滚动条
- 与通知类型颜色呼应
- 提升用户注意力

---

## 常见问题

### Q: 滚动条在某些浏览器上不显示？

**A:** 确保容器有明确的高度限制和 `overflow` 属性。

```tsx
// ✅ 正确
<div className="tw-h-96 tw-overflow-y-auto scrollbar-thin">

// ❌ 错误（没有高度限制）
<div className="tw-overflow-y-auto scrollbar-thin">
```

### Q: 如何自定义滚动条颜色？

**A:** 建议使用现有的样式类，如需特殊颜色，可在 `src/styles/index.css` 中添加新类。

```css
/* 添加到 index.css */
.scrollbar-custom::-webkit-scrollbar-thumb {
  background: rgba(255, 0, 0, 0.4);
}
```

### Q: 移动端是否需要特殊处理？

**A:** 移动端通常使用原生滚动条，样式会自动降级，无需特殊处理。

---

## 更新日志

- **2025-11-10**: 创建全局滚动条样式系统
  - 添加基础滚动条样式
  - 添加 `.scrollbar-thin`, `.scrollbar-primary`, `.scrollbar-purple`, `.scrollbar-hidden` 类
  - 优化 Ant Design 组件滚动条
  - 统一 RankingBoard 组件滚动条样式
