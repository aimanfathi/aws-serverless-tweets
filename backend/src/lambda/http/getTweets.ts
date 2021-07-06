import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils';
import { getTweets } from '../../businessLogic/tweets';


const logger = createLogger('GetTweets');


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info("---- Start Get Tweets ----");
  const userId = getUserId(event);

  const items = await getTweets(userId);

  logger.info("Get items: ", items);
  
  return {
      statusCode: 200,
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
          items: items
      })
  }

}
