import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils';
import { generateUploadUrl, updateAttachmentUrl } from '../../businessLogic/tweets';


const logger = createLogger('GenUploadURL');


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const tweetId = event.pathParameters.tweetId

  // Return a presigned URL to upload a file for a TODO item with the provided id
  logger.info("---- Start Generate Upload URL ----");
  logger.info("Event: ", event);

  const userId = getUserId(event);
  
  // Upload file to s3 and get uploadUrl
  const uploadUrl = await generateUploadUrl(tweetId);
  logger.info("Upload URL: ", uploadUrl);

  // Save file to DynamoDB
  await updateAttachmentUrl(userId, tweetId)


  return {
      statusCode: 200,
      headers: {
          'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        uploadUrl
      })
  }

}
