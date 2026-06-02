import type { FeedItem } from "@/lib/types/feed"

const stableThumbnail =
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80"

export const feedItems: FeedItem[] = [
  {
    id: "weibo-1",
    source: "微博",
    type: "微博",
    title: "工作室更新活动花絮",
    description: "分享一组活动现场照片",
    publishedAt: "2小时前",
    thumbnailUrl: stableThumbnail,
    originalUrl: "https://weibo.com/",
  },
  {
    id: "xiaohongshu-1",
    source: "小红书",
    type: "图片",
    title: "热门返图更新",
    description: "超话小姐姐分享现场返图",
    publishedAt: "今天12:30",
    thumbnailUrl: stableThumbnail,
    originalUrl: "https://www.xiaohongshu.com/",
  },
  {
    id: "douyin-1",
    source: "抖音",
    type: "视频",
    title: "新短视频发布",
    description: "张凌赫活动现场视频",
    publishedAt: "1小时前",
    thumbnailUrl: stableThumbnail,
    originalUrl: "https://www.douyin.com/",
  },
  {
    id: "tencent-1",
    source: "腾讯视频",
    type: "综艺",
    title: "开始推理吧 EP5 更新",
    description: "最新一期已上线",
    publishedAt: "今天",
    thumbnailUrl: stableThumbnail,
    originalUrl: "https://v.qq.com/",
  },
  {
    id: "taobao-live-1",
    source: "淘宝直播",
    type: "直播",
    title: "全棉时代直播预告",
    description: "今晚8点直播",
    publishedAt: "30分钟前",
    thumbnailUrl: stableThumbnail,
    originalUrl: "https://live.taobao.com/",
  },
]