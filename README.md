# Image-Shop-API

> A REST API for your image repository. Create an account then upload and delete your images.

Image-Shop because PhotoShop was already taken and I didn't want to get sued.

## About this project

This is an Express.js RestFul API which uses PostgreSQL to store user information and image data.

You may create an account by providing a username and a password.
After you create an account use the JSON-Web-Token to upload an image or multiple images at once.
Once you uploaded your image(s), you may access it by following the provided public URL.

-   ADD image(s) to the repository
    -   one / bulk / enormous amount of images
    -   private or public (permissions)
-   DELETE image(s)
    -   one
    -   Prevent a user deleting images from another user (access control)

## Requirements

You will need [Docker](https://docs.docker.com/get-docker/) installed with a version that supports Docker Compose.

## Getting Started

```ssh
git clone https://github.com/iamnotrodger/image-shop-api.git
cd image-shop-api
docker compose up --build
```

By default the REST API will run in "localhost:8080".
This will install all the necessary dependencies.

## REST API Endpoints

| Method | Route            | Header                          | Body                                                                                       | Response                                                                                                                                                                           |
| ------ | ---------------- | ------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | api/auth/sign-up |                                 | `json { "username": "name", "password": "my_password"}`                                    | `{ access_token: "<token>"}`                                                                                                                                                       |
| POST   | api/auth/login   |                                 | `json { "username": "name", "password": "my_password"}`                                    | `{ access_token: "<token>"}`                                                                                                                                                       |
| POST   | api/image        | `Authorization: Bearer <token>` | `form image=@"/path/to/image.jpg"`                                                         | `{id: 1, name: "image.jpg" path: "upload/image.jpg", url: "localhost:8080/upload/image}`                                                                                           |
| GET    | api/image        | `Authorization: Bearer <token>` |                                                                                            | `[{id: 1, name: "image.jpg" path: "upload/image.jpg", url: "localhost:8080/upload/image}, {id: 2, name: "image.jpg" path: "upload/image.jpg", url: "localhost:8080/upload/image}]` |
| DELETE | api/image/:id    | `Authorization: Bearer <token>` |                                                                                            |                                                                                                                                                                                    |
| POST   | api/image/multi  | `Authorization: Bearer <token>` | `form image=@"/path/to/image.jpg" image=@"/path/to/image.jpg" image=@"/path/to/image.jpg"` | `{id: 1, name: "image.jpg" path: "upload/image.jpg", url: "localhost:8080/upload/image}`                                                                                           |

## Examples

### POST api/auth/sign-up

Create an account

```ssh
curl --location --request POST 'localhost:8080/api/auth/sign-up' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "name",
    "password": "my_password"
}'

```

### POST api/auth/login

> Login to account

```ssh
curl --location --request POST 'localhost:8080/api/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "name",
    "password": "my_password"
}'

```

### POST api/image/

> Upload an image

```ssh
curl --location --request POST 'localhost:8080/api/image' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIwNDkyMjc3fQ.Kae5XO-uUtrUTDPy9cUZORkcIsRMCQLIeLFHZloF0Yc' \
--form 'image=@"/path/to/image.jpg"'

```

### GET api/image/

> Get your stored images

```ssh

curl --location --request GET 'localhost:8080/api/image' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIwNDkyMjc3fQ.Kae5XO-uUtrUTDPy9cUZORkcIsRMCQLIeLFHZloF0Yc'

```

### DELETE api/image/:id

> Delete your image

```ssh

curl --location --request DELETE 'localhost:8080/api/image/1' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIwNDkyMjc3fQ.Kae5XO-uUtrUTDPy9cUZORkcIsRMCQLIeLFHZloF0Yc'

```

### POST api/image/multi

> Upload multiple images at once

```ssh

curl --location --request POST 'localhost:8080/api/image/multi' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIwNDkyMjc3fQ.Kae5XO-uUtrUTDPy9cUZORkcIsRMCQLIeLFHZloF0Yc' \
--form 'image=@"/image.png"' \
--form 'image=@"/image.png"' \
--form 'image=@"/image.png"'

```
