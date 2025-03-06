# News Curator API

This repository contains the implementation of a RESTful API for a news curator application built with Node.js and Express.js. The API allows users to view articles, track article views, and record clicks on specific articles. 

## Features

- **Endpoints**:
  - `GET /api/v1/articles`: Retrieve a list of all articles.
  - `GET /api/v1/articles/:id`: Retrieve a specific article by its ID, incrementing its view count.
  - `POST /api/v1/articles`: Create a new article with title, content, and URL.
  - `POST /api/v1/articles/:id/click`: Record a click on a specific article.

- **Data Storage**: Utilizes MySQL with an ORM(Prisma) for managing database connections.


## Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up your MySQL database and configure your connection settings.
4. Run the application with `npm run dev`.

## Usage

This API can be used to manage news articles, making it easy to curate and analyze article engagement through views and clicks.
