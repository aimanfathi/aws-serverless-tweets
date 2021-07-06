/**
 * Fields in a request to update a single TODO item.
 */
export interface UpdateTweetRequest {
  tweet: string
  postDate: string
  isPublic: boolean
}