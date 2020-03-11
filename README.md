# Study_Guide
Study guide lets you create flash cards out of your study material for multiple choice tests
source: https://git.generalassemb.ly/ira/SEIR-FLEX-123/tree/master/projects/project_2
completed project on heroku: https://flash-card-study-guide.herokuapp.com/
git: https://github.com/glicksauce/Study_Guide
Heroku: https://flash-card-study-guide.herokuapp.com/studyguide

### Problem: 
I want to quiz myself on my study material but I accidentally keep revealing the answer, the questions always come in the same order, and the answers are always the same letter.
### General App Idea: 
A study guide that lets you add your study material and then turns it into flash cards which show in random order as well as random question order
###  Who would use it: 
Students studying for a multpile choice exam


## Website Explanation
* what approach was taken  
 - I had an idea in my head of what I wanted the site to be and set to to realize it one feature at a time. Not a very high level approach and the smallest of changes had challenges but it was very rewarded to complete.  

* unsolved problmens  
 - Any exam created shows up for all users instead of just the user that created it. Need to add more userSchema to only display Guide.id's in that array.  
 - When editing a question, the potential answers are not formatted correctly. Need to use some JS to fix  
 
* user stories  
- See my trello board: https://trello.com/b/X52gTjMI/study-guide  

* notes to myself  
- don't use subdocs/subSchema/nested schema ever again. Make everything separate and do joins.  

* show how to use website  
    - show how to use seed route  
    - show how login functionatlity works  

## MVP Checklist:
(complete) A working full-stack application, built by you, using Node.js, Mongoose, Express and EJS  
(complete) Adhere to the MVC file structure: Models, Views, Controllers  
(complete) At least one model with all 7 RESTful routes and full CRUD.  
exclamation A git repository not inside the class repo.  
(complete) At least one Github commit per day.  
(complete)Be deployed online and accessible to the public via Heroku  
A README.md file with explanations of the technologies used, the approach was taken, unsolved problems, user stories, and notes to yourself so you can come back to your project later in the course and be able to pick up your train of thought, etc  
(complete) Have a link to your hosted working app in the README.md file in your github repo  
(complete) Include sign up/log in functionality, with encrypted passwords & an authorization flow  

## Project Planning Checklist:
When you start your project, start with these items:  
(complete) A GitHub repo and a README with the following:  
(complete) At least one wireframe of the front end  
(complete) A bullet list of all features you will need to build in order to meet MVP and some stretch goal ideas.  
    * Create new project, MVC folders  
    * Setup 7 RESTful routes with bare bones pages  
    * Setup Authenticaion sessions  
    * Format index, show, create, edit pages  
    * Format exam review page  
    * Link Skeleton.css  
(complete) The three pieces above (Problem / General App Idea / Who Would Use It) as bullet points.  
(complete) A Trello containing the user stories needed to complete these features. https://trello.com/b/X52gTjMI/study-guide  

## Stretch Goals Checklist:
Recommended Features  
Add additional relationships (models can be related in a one-to-many relationship, for example)  
Optional notes on having two models  
(complete) Use EJS Partials  
Include portfolio-quality styling  
(complete - skeleton) Use a CSS framework like Skeleton or Bootstrap  
Incorporate a 3rd Party API like Google Maps  
Inside Your README.md:  
Include User Stories  
Include wireframes that you designed during the planning process  

## Presentation Checklist
Be approximately 5 minutes in length  
Show off all features of the app  
Explain the technical details  
Explain the technical challenges  
Explain which improvements you might make  
Highlight one new thing you learned during this project (can be something technical, or even something more open ended like time management, etc.)  