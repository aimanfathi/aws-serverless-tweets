import 'source-map-support/register'
import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
//import * as AWSXRay from 'aws-xray-sdk'
const AWSXRay = require('aws-xray-sdk');
import { TweetItem } from '../models/TweetItem'
import { TweetUpdate } from '../models/TweetUpdate'
import { createLogger } from '../utils/logger'

const logger = createLogger('tweetsAccess')

const XAWS = AWSXRay.captureAWS(AWS)

export class TweetsAccess {

    constructor(
        private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
        private readonly tweetsTable = process.env.TWEETS_TABLE,
        private readonly tweetIdIndex = process.env.INDEX_NAME
    ) {}
    

    async getTweetItems(userId: string): Promise<TweetItem[]> {
        const result = await this.docClient.query({
            TableName: this.tweetsTable,
            IndexName: this.tweetIdIndex,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId,
            }
        }).promise();

        const items = result.Items
        return items as TweetItem[]
    }


    async createTweetItem(tweetItem: TweetItem): Promise<void> {
        await this.docClient.put({
            TableName: this.tweetsTable,
            Item: tweetItem
        }).promise();

        return
    }

    async updateTweetItem(userId: string, tweetId: string, tweetUpdate: TweetUpdate): Promise<void> {
        logger.info(`Updating tweet item ${tweetId} by user ${userId}`)
        logger.info('Update Object: ', {tweetUpdate});

        await this.docClient.update({
            TableName: this.tweetsTable,
            Key: {
                tweetId,
                userId
            },
            UpdateExpression: 'set isPublic = :isPublic ',
            ExpressionAttributeValues: {
                ":isPublic": tweetUpdate.isPublic
            }
        }).promise();

        return
    }

    async deleteTweetItem(userId: string, tweetId: string): Promise<void> {
        logger.info(`Deleting tweet item ${tweetId} by user ${userId}`)

        await this.docClient.delete({
            TableName: this.tweetsTable,
            Key: {
                tweetId,
                userId
            }
        }).promise();

        return
    }

    async updateAttachmentUrl(userId: string, tweetId: string, attachmentUrl: string): Promise<void> {
        await this.docClient.update({
            TableName: this.tweetsTable,
            Key: {
                tweetId,
                userId
            },
            UpdateExpression: 'set attachmentUrl = :attachmentUrl',
            ExpressionAttributeValues: {
                ':attachmentUrl': attachmentUrl
            }
        }).promise();

        return
    }

}