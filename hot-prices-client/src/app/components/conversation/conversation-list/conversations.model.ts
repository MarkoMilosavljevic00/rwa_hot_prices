import { OfferType } from "src/app/enums/offer-type.enum";
import { PostStatus } from "src/app/enums/post-status.enum";
import { Conversation } from "src/app/models/conversation";
import { Offer } from "src/app/models/offer";

export const CONVERSATIONS: Conversation[] = [
  {
    id: 1,
    title: "What is the best programming language to learn in 2023?",
    imgPaths: ["https://images.hotukdeals.com/threads/raw/9Z0jX/4254964_1/re/1024x1024/qt/60/4254964_1.jpg", "https://images.hotukdeals.com/threads/raw/9Z0jX/4254964_2/re/1024x1024/qt/60/4254964_2.jpg"],
    numOfHotReactions: 12,
    numOfColdReactions: 3,
    postedDate: new Date("2023-12-04T15:48:07"),
    status: PostStatus.Available,
    owner: "Bing",
    category: "Programming",
    reactions: [],
    comments: [],
    reports: [],
    content: "I am interested in learning a new programming language in 2023, but I am not sure which one to choose. There are so many options out there, and each one has its own pros and cons. I want to learn a language that is popular, versatile, easy to learn, and has a good job market. What do you think is the best programming language to learn in 2023 and why?"
  },
  {
    id: 2,
    title: "How to make the perfect pizza at home?",
    imgPaths: ["https://images.hotukdeals.com/threads/raw/9Z0jX/4254964_3/re/1024x1024/qt/60/4254964_3.jpg", "https://images.hotukdeals.com/threads/raw/9Z0jX/4254964_4/re/1024x1024/qt/60/4254964_4.jpg"],
    numOfHotReactions: 10,
    numOfColdReactions: 5,
    postedDate: new Date("2023-12-03T12:30:00"),
    status: PostStatus.Available,
    owner: "Bing",
    category: "Food",
    reactions: [],
    comments: [],
    reports: [],
    content: "I love pizza, but I don't like ordering from restaurants or buying frozen ones. I want to make my own pizza at home, but I don't know how to do it. I need some tips and tricks on how to make the perfect pizza at home, from the dough to the sauce to the toppings. What are the best ingredients, tools, and methods to make a delicious homemade pizza?"
  },
  {
    id: 3,
    title: "What are the best coffee shops in London?",
    imgPaths: ["https://images.hotukdeals.com/threads/raw/9Z0jX/4254964_5/re/1024x1024/qt/60/4254964_5.jpg", "https://images.hotukdeals.com/threads/raw/9Z0jX/4254964_6/re/1024x1024/qt/60/4254964_6.jpg"],
    numOfHotReactions: 8,
    numOfColdReactions: 7,
    postedDate: new Date("2023-12-02T10:15:00"),
    status: PostStatus.Available,
    owner: "Bing",
    category: "Beverage",
    reactions: [],
    comments: [],
    reports: [],
    content: "I am a coffee lover and I am planning to visit London soon. I want to try some of the best coffee shops in the city, but I don't know where to go. I am looking for coffee shops that have great quality, variety, atmosphere, and service. What are the best coffee shops in London and what makes them special?"
  },
  {
    id: 4,
    title: "How to get fit and healthy in 2023?",
    imgPaths: ["https://images.hotukdeals.com/threads/raw/9Z0jX/4254964_7/re/1024x1024/qt/60/4254964_7.jpg", "https://images.hotukdeals.com/threads/raw/9Z0jX/4254964_8/re/1024x1024/qt/60/4254964_8.jpg"],
    numOfHotReactions: 9,
    numOfColdReactions: 6,
    postedDate: new Date("2023-12-01T16:45:00"),
    status: PostStatus.Available,
    owner: "Bing",
    category: "Health",
    reactions: [],
    comments: [],
    reports: [],
    content: "I want to get fit and healthy in 2023, but I don't know how to start. I have a busy schedule, a tight budget, and a lack of motivation. I need some advice on how to get fit and healthy in 2023, from the diet to the exercise to the lifestyle. What are the best ways to get fit and healthy in 2023 and what are the benefits of doing so?"
  },
  {
    id: 5,
    title: "What are the best songs of 2023?",
    imgPaths: ["https://images.hotukdeals.com/threads/raw/9Z0jX/4254964_9/re/1024x1024/qt/60/4254964_9.jpg", "https://images.hotukdeals.com/threads/raw/9Z0jX/4254964_10/re/1024x1024/qt/60/4254964_10.jpg"],
    numOfHotReactions: 11,
    numOfColdReactions: 4,
    postedDate: new Date("2023-11-30T18:00:00"),
    status: PostStatus.Available,
    owner: "Bing",
    category: "Music",
    reactions: [],
    comments: [],
    reports: [],
    content: "I love music and I want to discover some of the best songs of 2023. I like all kinds of genres, from pop to rock to rap to jazz. I want to listen to some of the best songs of 2023, from the hits to the hidden gems. What are the best songs of 2023 and why do you like them?"
  },
  {
    id: 6,
    title: "What are the best books of 2023?",
    imgPaths: ["https://images.hotukdeals.com/threads/raw/9Z0jX/4254964_11/re/1024x1024/qt/60/4254964_11.jpg", "https://images.hotukdeals.com/threads/raw/9Z0jX/4254964_12/re/1024x1024/qt/60/4254964_12.jpg"],
    numOfHotReactions: 7,
    numOfColdReactions: 8,
    postedDate: new Date("2023-11-29T14:30:00"),
    status: PostStatus.Available,
    owner: "Bing",
    category: "Books",
    reactions: [],
    comments: [],
    reports: [],
    content: "I love reading and I want to find some of the best books of 2023. I like all kinds of genres, from fiction to non-fiction to poetry to biography. I want to read some of the best books of 2023, from the bestsellers to the classics to the newcomers. What are the best books of 2023 and what makes them great?"
  }];