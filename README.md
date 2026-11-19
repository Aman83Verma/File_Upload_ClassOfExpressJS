# File Uploading System using Express.js, MongoDB & Cloudinary

A backend file-uploading application developed using **Node.js and Express.js** that supports local file storage, image uploads, video uploads, and image optimization through Cloudinary. The application integrates MongoDB for storing file metadata and Cloudinary for managing media assets.

This project was developed as part of my Express.js backend development classes to understand file handling, middleware integration, cloud-based media storage, API development, and database operations.

## 🚀 Features

- **Local File Upload:** Upload files directly to the local server using Express File Upload.
- **Image Upload:** Upload images to Cloudinary and store their secure URLs in MongoDB.
- **Video Upload:** Upload video files to Cloudinary with automatic resource-type detection.
- **Image Optimization:** Reduce image dimensions and optimize image quality using Cloudinary transformations.
- **File Type Validation:** Validate uploaded files based on their extensions and supported formats.
- **Cloud Storage Integration:** Store uploaded media assets in a dedicated Cloudinary folder.
- **Database Integration:** Save file names, tags, email addresses, image URLs, and video URLs in MongoDB.
- **REST API Development:** Implement separate API endpoints for different file-uploading operations.
- **Temporary File Handling:** Handle uploaded files using temporary storage before transferring them to Cloudinary.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime environment |
| Express.js | Backend framework and REST API development |
| MongoDB | Database for storing file metadata |
| Mongoose | MongoDB object modeling |
| Cloudinary | Cloud-based image and video storage |
| Express File Upload | Handling multipart/form-data file uploads |
| Dotenv | Managing environment variables |
| Postman | API testing and validation |
| Nodemon | Automatic server restarting during development |

## 📂 Project Structure

```text
File_Uploading_Class1/
│
├── config/
│   ├── cloudinary.js
│   └── database.js
│
├── controllers/
│   └── fileUpload.js
│
├── models/
│   └── File.js
│
├── routes/
│   └── FileUpload.js
│
├── files/                 # Local uploaded files
│
├── .env                   # Environment variables
├── .gitignore
├── index.js               # Application entry point
├── package.json
└── package-lock.json
```

## ⚙️ Installation and Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project Directory

```bash
cd File_Uploading_Class1
```

### 3. Install Dependencies

```bash
npm install
```

Alternatively, install the required packages:

```bash
npm install express mongoose dotenv express-fileupload cloudinary
```

Install Nodemon for development:

```bash
npm install --save-dev nodemon
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
PORT=4000

MONGODB_URL=your_mongodb_connection_string

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

**Note:** Replace the placeholder values with your actual MongoDB and Cloudinary credentials. Never expose your credentials or commit your `.env` file to GitHub.

### 5. Configure Package Scripts

Make sure your `package.json` contains the following scripts:

```json
"scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
}
```

### 6. Start the Development Server

```bash
npm run dev
```

The application will run at:

```text
http://localhost:4000
```

Expected terminal output:

```text
DB Connection Successful.
Cloudinary Connected Successfully.
App is running Successfully at Port Number: 4000
```

## 🔗 API Endpoints

The application exposes the following REST API endpoints under the base route:

```text
/api/v1/upload
```

### 1. Local File Upload

**Endpoint:**

```http
POST /api/v1/upload/localFileUpload
```

**Description:**

Uploads a file to the local server using Express File Upload middleware.

**Request Body:**

Select `Body → form-data` in Postman.

| Key | Type | Value |
|---|---|---|
| file | File | Select a file |

**Functionality:**
- Receives the uploaded file through `req.files`.
- Creates the local upload directory if it doesn't exist.
- Generates a unique filename using a timestamp.
- Moves the file to the server's local storage.

### 2. Image Upload

**Endpoint:**

```http
POST /api/v1/upload/imageUpload
```

**Description:**

Uploads an image to Cloudinary and saves its metadata and secure URL in MongoDB.

**Request Body:**

| Key | Type | Value |
|---|---|---|
| name | Text | Image name |
| tags | Text | Image category |
| email | Text | User email |
| imageFile | File | Select an image |

**Supported Image Formats:**
- JPG
- JPEG
- PNG
- GIF
- WEBP

**Functionality:**
- Validates the image file extension.
- Uploads the image to the `fileUploadClass` folder in Cloudinary.
- Retrieves the secure image URL.
- Saves the image metadata and URL in MongoDB.

### 3. Video Upload

**Endpoint:**

```http
POST /api/v1/upload/videoUpload
```

**Description:**

Uploads video files to Cloudinary and stores the corresponding video URL and metadata in MongoDB.

**Request Body:**

| Key | Type | Value |
|---|---|---|
| name | Text | Video name |
| tags | Text | Video category |
| email | Text | User email |
| videoFile | File | Select a video |

**Supported Video Formats:**
- MP4
- MOV
- MKV
- WEBM
- WMV

**Functionality:**
- Validates the video file extension.
- Uploads the video to Cloudinary.
- Uses automatic resource-type detection through Cloudinary.
- Retrieves the secure video URL.
- Stores video metadata and its URL in MongoDB.

### 4. Image Size Reducer

**Endpoint:**

```http
POST /api/v1/upload/imageSizeReducer
```

**Description:**

Uploads images to Cloudinary while applying image resizing and quality optimization to reduce unnecessary image dimensions and storage size.

**Request Body:**

| Key | Type | Value |
|---|---|---|
| name | Text | Image name |
| tags | Text | Image category |
| email | Text | User email |
| imageFile | File | Select an image |

**Image Optimization Configuration:**

```javascript
const transformation = {
    width: 1280,
    height: 1280,
    crop: "limit",
    quality: "auto:good"
};
```

**Functionality:**
- Validates the uploaded image format.
- Limits image dimensions to 1280 × 1280 pixels.
- Maintains the original aspect ratio using `crop: "limit"`.
- Automatically optimizes image quality using `quality: "auto:good"`.
- Uploads the transformed image to Cloudinary.
- Saves the optimized image URL and metadata in MongoDB.

**Note:** Images smaller than the specified dimensions are not enlarged. Actual output dimensions and file size depend on the original image and Cloudinary's transformations.

## ☁️ Cloudinary Integration

Cloudinary is integrated to handle cloud-based media storage and image/video management.

The application uses the Cloudinary SDK:

```javascript
const cloudinary = require("cloudinary").v2;
```

Cloudinary configuration is managed through environment variables.

```javascript
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
```

Uploaded media files are organized inside the following Cloudinary folder:

```text
fileUploadClass/
```

The application retrieves the `secure_url` returned by Cloudinary and stores it in MongoDB.

## 🗄️ MongoDB Database Structure

The application uses Mongoose to define the file metadata schema.

**File Model:**

```javascript
const mongoose = require("mongoose");

const fileUpload = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageURL: {
        type: String
    },
    videoURL: {
        type: String
    },
    tags: {
        type: String
    },
    email: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("File", fileUpload);
```

**Stored Information:**

| Field | Description |
|---|---|
| `_id` | Unique MongoDB document identifier |
| `name` | Uploaded file name or title |
| `imageURL` | Secure Cloudinary image URL |
| `videoURL` | Secure Cloudinary video URL |
| `tags` | File category or associated tags |
| `email` | User email address |
| `__v` | Mongoose document version key |

Image and video URLs are optional because a document generally represents either an image or a video.

## 👨‍💻 Author

**Aman Verma**

B.Tech Computer Science & Engineering | Java Full Stack Developer | Backend Development Enthusiast

- **GitHub:** https://github.com/Aman83Verma
- **LinkedIn:** https://linkedin.com/in/amanverma81

---

⭐ If you find this project useful for learning Express.js file handling and Cloudinary integration, feel free to explore the repository.

**Built as part of my Express.js Backend Development Learning Journey.**
