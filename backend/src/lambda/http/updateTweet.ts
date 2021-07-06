import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { UpdateTweetRequest } from '../../requests/UpdateTweetRequest'
import 'source-map-support/register'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils';
import { updateTweet } from '../../businessLogic/tweets';


const logger = createLogger('UpdateTweet');


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const tweetId = event.pathParameters.tweetId
  const updatedTweet: UpdateTweetRequest = JSON.parse(event.body)

  logger.info("---- Start Update Tweet ----");
  logger.info("Event: ", event);
  const userId = getUserId(event);

  await updateTweet(userId, tweetId, updatedTweet);

  return {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    },
    body: ''
  }
  
}
