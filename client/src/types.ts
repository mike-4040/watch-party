export interface PropsUser {
  userId: number | null;
  wsConnId: string | null;
}

export interface PropsUserPlay extends PropsUser {
  isPlaying: boolean;
}
