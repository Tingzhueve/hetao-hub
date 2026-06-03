import type {
  PastActivity,
  UpcomingActivity,
  UpcomingActivityStatus,
} from "@/lib/types/calendar"

export const upcomingActivities: UpcomingActivity[] = [
  {
    id: "activity-cotton-times-live",
    phase: "upcoming",
    title: "全棉时代直播",
    platform: "淘宝直播",
    date: "6月5日 20:00",
    status: "confirmed",
    image: {
      src: "/images/feed/zlh5.jpg",
      alt: "全棉时代直播预告图",
    },
  },
  {
    id: "activity-magazine-release",
    phase: "upcoming",
    title: "杂志释出",
    platform: "品牌官方",
    date: "6月上旬",
    status: "pending_announcement",
    image: {
      src: "/images/feed/zlh2.jpg",
      alt: "杂志释出预热图",
    },
  },
  {
    id: "activity-begin-investigation-ep6",
    phase: "upcoming",
    title: "开始推理吧 EP6 更新",
    platform: "腾讯视频",
    date: "6月12日 12:00",
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
    phase: "past",
    title: "开始推理吧 EP5 更新",
    platform: "腾讯视频",
    date: "6月1日",
    image: {
      src: "/images/feed/zlh4.jpg",
      alt: "开始推理吧 EP5 宣传图",
    },
  },
  {
    id: "activity-studio-bts-release",
    phase: "past",
    title: "工作室发布活动花絮",
    platform: "微博",
    date: "5月30日",
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
