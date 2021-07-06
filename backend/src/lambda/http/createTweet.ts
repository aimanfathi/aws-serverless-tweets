import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { CreateTweetRequest } from '../../requests/CreateTweetRequest';
import 'source-map-support/register';
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils';
import { createTweet } from '../../businessLogic/tweets';


const logger = createLogger('CreateTweet');


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newTweet: CreateTweetRequest = JSON.parse(event.body);

  logger.info("---- Start Create Tweet ----");
  logger.info("Event: ", event);
  const userId = getUserId(event);

  const newItem = await createTweet(userId, newTweet)

  return {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item: newItem
    })
  }

}
