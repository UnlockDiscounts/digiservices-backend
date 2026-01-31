# DigiServices API 📚


## Quick start ⚡

- Install dependencies:

```bash
npm install
```

- Create a `.env` file in the project root with the following variables:

```
PORT=5000
MONGO_URI=<your_mongo_connection_string>
CLOUDINARY_CLOUD_NAME=<cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>
```

- Run the app:

```bash
# development (auto-restart)
npm run dev

# or production
npm start
```

---

## Base URL

All endpoints are prefixed with:

`http://localhost:<PORT>/api/v1`

Replace `<PORT>` with the value from your `.env`.

---

## Contact Endpoints 💬

### Create contact message

- Method: POST
- URL: `/contact`
- Content-Type: `application/json`

Request body (JSON):

```json
{
	"fullname": "John Doe",
	"companyName": "ACME",
	"email": "john@example.com",
	"contactNumber": "1234567890",
	"message": "Hello, I need help"
}
```

Success response: 201 Created

```json
{
	"_id": "...",
	"fullname": "John Doe",
	"companyName": "ACME",
	"email": "john@example.com",
	"contactNumber": "1234567890",
	"message": "Hello, I need help",
	"createdAt": "...",
	"updatedAt": "..."
}
```

Errors:
- 400 Bad Request — missing required fields
- 500 Server Error — internal error


### Get all contact messages

- Method: GET
- URL: `/contact`

Response: 200 OK

Returns an array of messages (most recent first).


### Delete a contact message

- Method: DELETE
- URL: `/contact/:id`

Response: 200 OK on success (or 404 if not found).

---

## Blog Endpoints ✍️

Blog posts support image uploads (Cloudinary) using `multipart/form-data`.

### Create a post

- Method: POST
- URL: `/blog`
- Content-Type: `multipart/form-data`
- Form fields:
	- `header` (string, required)
	- `description` (string, required)
	- `category` (string, required) — blog post category
	- `images` (file[], optional) — use the field name `images`; up to 10 files are supported

Example curl (single image):

```bash
curl -X POST http://localhost:5000/api/v1/blog \
	-F "header=My post" \
	-F "description=Post description" \
	-F "category=Technology" \
	-F "images=@/path/to/image.jpg"
```

Success response: 201 Created — post object with `images` array of URLs, `createdAt`, and `updatedAt` timestamps automatically generated.


### Get posts

- Method: GET
- URL: `/blog`

Response: 200 OK — array of posts.


### Get post by id

- Method: GET
- URL: `/blog/:id`


### Update a post

- Method: PUT
- URL: `/blog/:id`
- Content-Type: `multipart/form-data`
- Fields:
	- `header` (string, required)
	- `description` (string, required)
	- `category` (string, required)
	- `status` (string, draft and published (default: draft))
	- `images` (file[], optional) — you may upload new images (also `images` field)
- The `updatedAt` timestamp is automatically updated on modification.


### Delete a post

- Method: DELETE
- URL: `/blog/:id`

Response: 200 OK on success (or 404 if not found).

---


## Services
- POST `/services` (multipart/form-data)
  - fields: `category` (string), `title` (string), `description` (string, optional)
  - files: `files` (file[]), Cloudinary stores files in `services/` folder
- GET `/services` — list services
- GET `/services/:id` — get single service
- PUT `/services/:id` — update (multipart/form-data; optional `files`)
- DELETE `/services/:id`


## Card Components
- POST `/cards` (JSON)
  - fields: `service` (optional service _id), `sections` (array of objects with `sectionTitle`, `title`, `description`)
  - You can provide `sections` either as JSON array in request body or as a JSON string when using form-data.
- GET `/cards`
- GET `/cards/:id`
- PUT `/cards/:id`
- DELETE `/cards/:id`


## Testimonials
- POST `/testimonials` (multipart/form-data)
  - fields: `name` (string), `description` (string)
  - file: `file` (single file)
- GET `/testimonials`
- PUT `/testimonials/:id` (multipart/form-data)
- DELETE `/testimonials/:id`


## FAQs
- POST `/faqs` (JSON) — `question` and `answer`
- GET `/faqs`
- PUT `/faqs/:id`
- DELETE `/faqs/:id`


## Work Examples
- POST `/works` (multipart/form-data)
  - fields: `title`, `description`
  - files: `files` (file[]), supports any format; uploaded to Cloudinary `work_examples/` folder
- GET `/works`
- PUT `/works/:id` (multipart/form-data)
- DELETE `/works/:id`


## Preview (aggregate)
- GET `/preview` — returns an object with `{ services, cards, testimonials, faqs, works }` so the frontend can render a preview page with all the content.
