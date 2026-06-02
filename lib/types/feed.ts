export type SourcePlatform = "微博" | "小红书" | "抖音" | "腾讯视频" | "淘宝直播"

export type ContentType = "微博" | "图片" | "视频" | "直播" | "综艺" | "品牌"

export interface FeedItem {
  id: string
  source: SourcePlatform
  type: ContentType
  title: string
  description: string
  publishedAt: string
  thumbnailUrl?: string
  originalUrl: string
}

