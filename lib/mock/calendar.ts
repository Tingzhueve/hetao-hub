import type {
  CalendarActivity,
  PastActivity,
  UpcomingActivity,
  UpcomingActivityStatus,
} from "@/lib/types/calendar"

export const upcomingActivities: UpcomingActivity[] = [
  {
    id: "activity-cotton-times-live",
    slug: "cotton-times-live",
    phase: "upcoming",
    title: "全棉时代直播",
    platform: "淘宝直播",
    date: "6月5日 20:00",
    description:
      "品牌直播活动预计在晚间开始，活动页面会集中展示预告物料、直播入口和后续相关动态。",
    status: "confirmed",
    image: {
      src: "/images/feed/zlh5.jpg",
      alt: "全棉时代直播预告图",
    },
  },
  {
    id: "activity-magazine-release",
    slug: "magazine-release",
    phase: "upcoming",
    title: "杂志释出",
    platform: "品牌官方",
    date: "6月上旬",
    description:
      "杂志相关物料和正式释出时间还在等待官宣，目前可以先关注预热图片与品牌侧动态。",
    status: "pending_announcement",
    image: {
      src: "/images/feed/zlh2.jpg",
      alt: "杂志释出预热图",
    },
  },
  {
    id: "activity-begin-investigation-ep6",
    slug: "begin-investigation-ep6",
    phase: "upcoming",
    title: "开始推理吧 EP6 更新",
    platform: "腾讯视频",
    date: "6月12日 12:00",
    description:
      "节目正片将于中午更新，详情页可以作为集中查看更新时间、平台信息和相关宣传内容的入口。",
    status: "confirmed",
    image: {
      src: "/images/feed/zlh4.jpg",
      alt: "开始推理吧 EP6 宣传图",
    },
  },
]

export const pastActivities: PastActivity[] = [
  {
    id: "activity-begin-investigation-ep5",
    slug: "begin-investigation-ep5",
    phase: "past",
    title: "开始推理吧 EP5 更新",
    platform: "腾讯视频",
    date: "6月1日",
    description:
      "节目 EP5 已完成上线，相关回顾内容包括正片链接、宣传图和官方账号后续发布的更新。",
    image: {
      src: "/images/feed/zlh4.jpg",
      alt: "开始推理吧 EP5 宣传图",
    },
  },
  {
    id: "activity-studio-bts-release",
    slug: "studio-bts-release",
    phase: "past",
    title: "工作室发布活动花絮",
    platform: "微博",
    date: "5月30日",
    description:
      "工作室微博已发布活动花絮照片，这里可以集中查看配图、平台来源和相关联的后续更新。",
    image: {
      src: "/images/feed/zlh1.jpg",
      alt: "工作室发布活动花絮配图",
    },
  },
]

export const upcomingStatusLabel: Record<UpcomingActivityStatus, string> = {
  confirmed: "已确认",
  pending_announcement: "待官宣",
}

export const calendarActivities: CalendarActivity[] = [
  ...upcomingActivities,
  ...pastActivities,
]

export function getCalendarActivityBySlug(slug: string) {
  return calendarActivities.find((activity) => activity.slug === slug)
}
