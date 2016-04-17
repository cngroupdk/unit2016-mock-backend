# unIT2016-mock-backend

Mock backend for unIT 2016 student contest

This is the REST/JSON API implementation, which can be used to feed your front-end application. The intent is to give you a base functionality, so you can focus on the visual part of the application itself.

The API offers following end-points:

* messages
* ame (A'me)
* dashboard

## API general

1. If you try to call an end-point HTTP method, which does not exists, the standard `HTTP 405 - Method not allowed` is returned.

2. If you `POST` a new data and some mandatory field is missing, the standard `HTTP 400 - Bad request` is returned.

3. If you try to call not existing end-point, standard `HTTP 404 - Not found` is returned.

4. If everything goes well, standard `HTTP 200 - OK` is returned.

## Messages

Messages API offers 2 end-points:

* list messages
* create a new message

### List messages

* URL: `/messages
* HTTP method: `GET`
* Content-type: `application/json`

#### Response

Array of _message_ objects, which contains:

* `guid` - unique _message_ ID
* `timestamp` - `datetime`, when the _message_ was created, format ISO 8601 standard
* `authorEmail` - email of the _message_ author
* `text` - text of the _topTenMessages
* `votes` - array of `authorEmail`, who did the vote (a'me)

**Example:**

```
[
  {
    "guid": "MOND-0012",
    "timestamp": "2016-04-12T17:59:23.273Z",
    "authorEmail": "jessie@doe.com",
    "text": "Monday message #12 with 1 vote",
    "votes": [
        "jim@beam.com"
    ]
  },
  {
    "guid": "MOND-0011",
    "timestamp": "2016-04-12T16:17923.273Z",
    "authorEmail": "john@doe.com",
    "text": "Monday message #11 with 2 votes",
    "votes": [
        "johny@walker.com",
        "jack@daniels.com"
    ]
  }
]
```

### Create a new message

* URL: `/messages
* HTTP method: `POST`
* Content-type: `application/json`

#### Payload

JSON object with attributes:

* `authorEmail`
* `text`
* `guid` - is optional, backend generates it, if not found

`timestamp` and empty `votes` array are created automatically also.

**Example:**

```
{
  "authorEmail": "john@doe.com",
  "text": "Hello World!"
}
```

#### Response

Standard HTTP codes are sent:

* HTTP 200 - if the _message_ has been successfully created
* HTTP 400 - if some mandatory filed is missing

## A'me

A'me API offers 1 end-point:

* create a new _vote_

### Create a new vote

* URL: `/ame
* HTTP method: `POST`
* Content-type: `application/json`

#### Payload

JSON object with attributes:

* `authorEmail` - email address of the _voter_ (that who gives _vote_)
* `messageGuid` - `guid` if the message to which is the _vote_ given

**Example:**

```
{
  "authorEmail": "john@doe.com",
  "guid": "ABCD-1234"
}
```

#### Response

Standard HTTP codes are sent:

* HTTP 200 - if the _vote has been successfully created
* HTTP 400 - if some mandatory filed is missing

## Dashboard

Dashboard API offers 1 end-point:

* get statistics for day and a week ending given day

### Get statistics

* URL: `/dashboard/:year/:month/:day`
* HTTP method: `GET`
* Content-type: `application/json`

#### Response

Object with 2 sub-objects:

* `dayStats` - computed statistics for given day
* `weekStats` - computed statistics for a week, ending given date

Each of these sub-objects contains 2 sub-sub-objects:

* `topTenMessages` - array of top 10 most _voted messages_
* `topTenAuthors` - array of top 10 authors, whose _messages_ have most _votes_

The `topTenMessages` array is in the same structure as by the `GET /messages` end-point.

The objects in `topTenAuthors` contains 2 attributes:

* `authorEmail`
* `votes` - number of collected _votes

**Example:**

```
{
  "dayStats": {
    "topTenMessages": [
      {
        "guid": "MOND-0005",
        "timestamp": "2016-04-12T13:47:23.273Z",
        "authorEmail": "john@doe.com",
        "text": "Monday message #5 with 4 votes",
        "votes": [
          "johny@walker.com",
          "jim@beam.com",
          "jack@daniels.com",
          "ron@zacapa.com"
        ]
      },
      {
        "guid": "MOND-0008",
        "timestamp": "2016-04-12T14:47:23.273Z",
        "authorEmail": "jane@doe.com",
        "text": "Monday message #8 with 2 votes",
        "votes": [
          "johny@walker.com",
          "jim@beam.com"
        ]
      },
      ...
    ],
    "topTenAuthors": [
      {
        "authorEmail": "jane@doe.com",
        "votes": 9
      },
      {
        "authorEmail": "john@doe.com",
        "votes": 7
      },
      {
        "authorEmail": "jessie@doe.com",
        "votes": 1
      },
      ...
    ]
  },
  "weekStats": {
    ...
  }
}
```
