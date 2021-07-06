import 'source-map-support/register'
import * as uuid from 'uuid'
import { TweetsAccess } from '../dataLayer/tweetsAccess'
import { TweetsStorage } from '../dataLayer/tweetsStorage'
import { TweetItem } from '../models/TweetItem'
import { TweetUpdate } from '../models/TweetUpdate'
import { CreateTweetRequest } from '../requests/CreateTweetRequest'
import { UpdateTweetRequest } from '../requests/UpdateTweetRequest'

const tweetsAccess = new TweetsAccess()
const tweetsStorage = new TweetsStorage()

export async function getTweets(userId: string): Promise<TweetItem[]> {
    return await tweetsAccess.getTweetItems(userId)
}

export async function createTweet(userId: string, createTweetRequest: CreateTweetRequest): Promise<TweetItem> {
    const itemId = uuid.v4();
    const postDate = new Date().toISOString();

    const newItem = {
        tweetId: itemId,
        userId: userId,
        postDate: postDate,
        isPublic: false,
        attachmentUrl: null,
        ...createTweetRequest
    };
  
    await tweetsAccess.createTweetItem(newItem)
    return newItem
}

export async function updateTweet(userId: string, tweetId: string, updateTweetRequest: UpdateTweetRequest): Promise<void> {
    await tweetsAccess.updateTweetItem(userId, tweetId, updateTweetRequest as TweetUpdate)
    return
}

export async function deleteTweet(userId: string, tweetId: string): Promise<void> {
    await tweetsAccess.deleteTweetItem(userId, tweetId);
    return
}

export async function updateAttachmentUrl(userId: string, tweetId: string): Promise<void> {
    const attachmentUrl = await tweetsStorage.getAttachmentUrl(tweetId)
    await tweetsAccess.updateAttachmentUrl(userId, tweetId, attachmentUrl)
    return
}

export async function generateUploadUrl(attachmentId: string): Promise<string> {
    const uploadUrl = await tweetsStorage.getUploadUrl(attachmentId)
    return uploadUrl
}