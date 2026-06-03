export type ActivityPlatform =
  | "微博"
  | "小红书"
  | "抖音"
  | "INS"
  | "腾讯视频"
  | "淘宝直播"
  | "品牌官方"

export type ActivityPhase = "upcoming" | "past"

export type UpcomingActivityStatus = "confirmed" | "pending_announcement"

export interface ActivityImage {
  src: string
  alt: string
}

export interface BaseActivity {
  id: string
  phase: ActivityPhase
  title: string
  platform: ActivityPlatform
  date: string
  image: ActivityImage
}

export interface UpcomingActivity extends BaseActivity {
  phase: "upcoming"
  status: UpcomingActivityStatus
}

export interface PastActivity extends BaseActivity {
  phase: "past"
}

export type CalendarActivity = UpcomingActivity | PastActivity
