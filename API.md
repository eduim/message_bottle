# Message in a Bottle API

## Authentication

This api works with token authentication, in order to get a token first the user should authorize this app with GitHub, starting with a `GET /login/github`.

## Communication

This api communicates in JSON, it's mandatory that the `Content-Type` header is set to `application/json`.

## Endpoints

### GET /login/github

Start OAuth with github, get a JWT token, elaborate

#### Parameters

- **callback**: url to redirect to when the auth process is finished

At the end of the process you get redirected to the `callback` url, with the following information as query string.

- **token**: in case of success, a token is going to be delivered
- **error**: in case of error, error message with the reason of failure. Empty if success.

### GET /me `Auth`

#### Response

```json
{
  "name": 'limitlessgenius',
	"team": 'august-22',
  "currentDay": 24
}
```

### POST /moods

Create a mood

#### Request

```json
{
  "mood": 4
}
```

#### Response

```json
{
  "id": 1234,
  "mood": 4,
 	"postDate": "2022-10-14T10:33:23Z"
}
```

### GET /moods

Get the chart data on agregated moods, and your own moods

#### Response

> Todo: define the response with chart data

### POST /messages

Create a message related to a mood

#### Request

```json
{
  "entrytext": "#My day was absolutly great\n## How to learn express\n Here's express [documentation](https://expressjs.com/)"
}
```

#### Respone

```json
{
  "id":1234,
  "moodId": 234,
  "entrytext": "# My day was absolute shit\n## How not to learn express\n Here's express [documentation](https://expressjs.com/)",
}
```



### GET /messages

Get a random message depending on a mood (mood infered from the user last mood)

#### Response

```json
{
  "id":1234,
  "moodId": {
    "id": 234,
    "mood": 4
  },
  "entrytext": "# My day was absolute shit\n## How not to learn express\n Here's express [documentation](https://expressjs.com/)",
}
```
