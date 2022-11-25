# Install

`npm install`

---

# Things to add

- Create a `.env` file in config folder and add the following as `key = value`
  - PORT = 2121 (can be any port example: 3000)
  - DB_STRING = `your database URI`
  - CLOUD_NAME = `your cloudinary cloud name`
  - API_KEY = `your cloudinary api key`
  - API_SECRET = `your cloudinary api secret`

---

# Why does this exist?
Enterprise fashion software (PLM) has the potential to be extremely useful to everyday consumers, but is outdated and bloated. The point of this project was to improve on the existing software, but streamline to only necessary tasks. Additionally, the project shifts the focus onto a collector/enthusiast perspective - the goal is to give the end user the capabilites to manage their collection of choice in a manner similar to what is used by professionals.

The main idea of this app is simple - users can add information on items of their collection of choice (costing, purchase date, brand, etc) to more easily manage their collections. Additionally, a user-created API is able to show market data (sales, min selling price, max selling price, etc) in order to allow the user to determine their product's current market value.

<a href="https://ibb.co/XL854nf"><img src="https://i.ibb.co/zxJ253W/1.jpg" alt="1" border="0"></a>

<a href="https://ibb.co/19vxCBw"><img src="https://i.ibb.co/sFmrTcM/2.jpg" alt="2" border="0"></a>

Users can also offer their product up for sale. If a user gives one of their products an "asking price," it will be pushed to a public feed, which will allow other users to view and potentially buy those garments.

<a href="https://ibb.co/D8Z3sJH"><img src="https://i.ibb.co/qWvbXS3/3.jpg" alt="3" border="0"></a>

https://collectioncloset.up.railway.app/

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Express, Node, Tailwind, EJS, MongoDB, Cloudinary, React, Stripe API

This program, at its core, is a fairly standard CRUD app. The idea is that the user inputs data (texts/images) into a form, which then shows up in their personal collection. They can manage privately, or publically share with others on the app. There are basic social media elements as well - users can comment on others collection, and offer to purchase any "public" goods through a Stripe API implementation.

The element of the app that I am most proud of involves two API implementations: 

1. User-created eBay API found on the internet. The idea is that a user can manage their individual goods by calling on the API, which provides recent sales data for similar styles (minimum/maximum/average sales price) based on recent completed eBay auctions. The user can use this information to decide if they wish to sell the individual item, or maybe buy additional copies of that item. This app focuses on apparel/fashion collections, but can easily be revised to accomodate collections of any type - the eBay API can accomodate literally anything sold on eBay, and the CRUD/social media elements don't need to be changed either.

2. Stripe API - was able to use this to implement a basic payment element for goods offered for sale. This wasn't the main intention of the project, but I felt it was necessary to take it to the "next level," as this concept naturally morphs into an e-commerce idea if allowed time to expand; a payment element was logical.

## Lessons Learned:

Over the 100 or so hours spent working on this, I faced and overcame a number of roadblocks.

1. The eBay API as discussed above was difficult to get working properly. I spent a fair amount of time working through issues through Postman and trial-and-error. The end result was worth it - this element of the app is truly useful. I would like to expand on this in the future, perhaps with graph visualization of the data that gets pulled from the API.

2. Implementation of the Stripe API. I wanted to add in a small amount of Stripe, but not so much as to build out an entire payment backend, as this wasn't the goal of the project. I was able to implement a small amount into the project and, in doing so, was able to expand my skillset.

3. Trial and error with Cloudinary and Tailwind, two services that I did not have a ton of experience with prior to this program. Success came down to slowing down, and reading documentation in order to overcome roadblocks here.
 
 ## Optimizations:

There are a number of directions that this idea could be taken further moving forward.

I've implemented a minimal amount of Stripe into the project. Stripe has a lot of documentation and a lot of capabilities - I could spend time building out a proper payment procedure, if desired.

I actually prefer the minimal formatting - the app gets right to the point. However, this branding might turn away viewers who prefer a more "visual experience." It could look more desirable/professional with a React/Tailwind update.

I'm really proud of getting the eBay API to work with relevant data - it's truly the most useful part of the app. I'd like to expand on the data pulled from the API in the future - perhaps graph the data pulled, or something similar.
# Pool_Inv
