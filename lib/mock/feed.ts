import type { FeedItem } from "@/lib/types/feed"

export type HighlightedUpdate = {
  id: string
  icon: string
  title: string
  subtitle: string
  source: string
  status: string
}

export const highlightedUpdates: HighlightedUpdate[] = [
  {
    id: "highlight-live",
    icon: "📺",
    title: "今晚 20:00 全棉时代直播",
    subtitle: "淘宝直播 · 品牌活动",
    source: "淘宝直播",
    status: "今晚 20:00",
  },
  {
    id: "highlight-variety",
    icon: "🎬",
    title: "开始推理吧 EP5 已更新",
    subtitle: "腾讯视频 · 综艺正片",
    source: "腾讯视频",
    status: "已更新",
  },
  {
    id: "highlight-studio",
    icon: "📸",
    title: "工作室发布活动花絮",
    subtitle: "微博 · 官方动态",
    source: "微博",
    status: "2小时前",
  },
]

export const feedItems: FeedItem[] = [
  {
    id: "weibo-1",
    source: "微博",
    type: "微博",
    title: "工作室更新活动花絮",
    description: "分享一组活动现场照片",
    publishedAt: "2小时前",
    thumbnailUrl: "/images/feed/zlh1.jpg",
    originalUrl: "https://weibo.com/",
  },
  {
    id: "xiaohongshu-1",
    source: "小红书",
    type: "图片",
    title: "热门返图更新",
    description: "超话小姐姐分享现场返图",
    publishedAt: "今天12:30",
    thumbnailUrl: "/images/feed/zlh2.jpg",
    originalUrl: "https://www.xiaohongshu.com/",
  },
  {
    id: "douyin-1",
    source: "抖音",
    type: "视频",
    title: "新短视频发布",
    description: "张凌赫活动现场视频",
    publishedAt: "1小时前",
    thumbnailUrl: "/images/feed/zlh3.jpg",
    originalUrl: "https://www.douyin.com/",
  },
  {
    id: "tencent-1",
    source: "腾讯视频",
    type: "综艺",
    title: "开始推理吧 EP5 更新",
    description: "最新一期已上线",
    publishedAt: "今天",
    thumbnailUrl: "/images/feed/zlh4.jpg",
    originalUrl: "https://v.qq.com/",
  },
  {
    id: "taobao-live-1",
    source: "淘宝直播",
    type: "直播",
    title: "全棉时代直播预告",
    description: "今晚8点直播",
    publishedAt: "30分钟前",
    thumbnailUrl: "/images/feed/zlh5.jpg",
    originalUrl: "https://live.taobao.com/",
  },
]
