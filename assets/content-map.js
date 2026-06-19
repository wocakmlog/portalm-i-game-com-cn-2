// assets/content-map.js

const siteContentMap = {
  domain: "https://portalm-i-game.com.cn",
  primaryTag: "爱游戏",
  version: "1.0.2",
  sections: [
    {
      id: "home",
      label: "首页",
      keywords: ["爱游戏", "热门推荐", "新游上线"],
      items: [
        { title: "今日精选", url: "/featured", tags: ["爱游戏", "推荐"] },
        { title: "限时活动", url: "/events", tags: ["活动", "福利"] }
      ]
    },
    {
      id: "library",
      label: "游戏库",
      keywords: ["爱游戏", "分类浏览", "全部游戏"],
      items: [
        { title: "角色扮演", url: "/genre/rpg", tags: ["RPG", "爱游戏"] },
        { title: "策略模拟", url: "/genre/strategy", tags: ["策略", "模拟"] },
        { title: "休闲益智", url: "/genre/casual", tags: ["休闲", "益智"] }
      ]
    },
    {
      id: "news",
      label: "资讯",
      keywords: ["爱游戏", "游戏新闻", "更新公告"],
      items: [
        { title: "最新动态", url: "/news/latest", tags: ["新闻", "爱游戏"] },
        { title: "版本更新", url: "/news/patches", tags: ["更新", "公告"] }
      ]
    },
    {
      id: "community",
      label: "社区",
      keywords: ["爱游戏", "玩家论坛", "攻略交流"],
      items: [
        { title: "热门话题", url: "/community/hot", tags: ["讨论", "爱游戏"] },
        { title: "攻略分享", url: "/community/guides", tags: ["攻略", "心得"] }
      ]
    }
  ]
};

function filterContentByTag(tag) {
  const results = [];
  for (const section of siteContentMap.sections) {
    for (const item of section.items) {
      if (item.tags.includes(tag)) {
        results.push({
          sectionLabel: section.label,
          title: item.title,
          url: siteContentMap.domain + item.url,
          tags: item.tags
        });
      }
    }
  }
  return results;
}

function searchContent(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const results = [];
  for (const section of siteContentMap.sections) {
    for (const item of section.items) {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchKeywords = section.keywords.some(k => k.toLowerCase().includes(q));
      const matchTags = item.tags.some(t => t.toLowerCase().includes(q));
      if (matchTitle || matchKeywords || matchTags) {
        results.push({
          sectionLabel: section.label,
          title: item.title,
          url: siteContentMap.domain + item.url,
          relevance: (matchTitle ? 3 : 0) + (matchKeywords ? 2 : 0) + (matchTags ? 1 : 0)
        });
      }
    }
  }
  results.sort((a, b) => b.relevance - a.relevance);
  return results;
}

// 简单测试输出（可移除）
console.log("=== 按标签过滤: 爱游戏 ===");
console.log(filterContentByTag("爱游戏"));

console.log("\n=== 搜索: 攻略 ===");
console.log(searchContent("攻略"));

console.log("\n=== 搜索: 休闲 ===");
console.log(searchContent("休闲"));