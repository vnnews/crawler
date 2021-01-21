# Crawler module

## Usage

1. Create Pub/Sub topics: 
    - `crawler.crawl_site`
    - `crawler.crawl_article`
1. Create Firestore database, make sure project location is `asia-east2` to optimize cost
1. Create bucket `vietnamese-news-exports`
1. Execute `npm run deploy`
