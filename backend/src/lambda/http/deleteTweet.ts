import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils';
import { deleteTweet } from '../../businessLogic/tweets';


const logger = createLogger('DeleteTweet');


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const tweetId = event.pathParameters.tweetId

  logger.info("---- Start Delete Tweet ----");
  logger.info("Event: ", event);
  const userId = getUserId(event);

  await deleteTweet(userId, tweetId);

  return {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    },
    body: ''
  }

}
