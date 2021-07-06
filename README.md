# Capstone Project - Serverless - Tweets App

This is a serverless app used for viewing, creating, editing and deleting tweets.
User has to login to use the app and perform the CRUD operations.
App has security part to ensure each user can view/modify his tweets only.

## Tweet data:
tweetId: (string) unique ID for the tweet.
userId: (string) uique ID for the authenticated user.
isPublic: (boolean) flag to indicate if tweet is public or not.
postDate: (string) the posting date/time for the tweet.
tweet: (string) the tweet text.
attachmentUrl: (string) url for attachment photo.