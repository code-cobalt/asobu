# Asobu - Social Meetup Application

## Project Description

This is a reactNative mobile social application. It contains game-like elements designed to encourage users to find new people to meet. Profiles will contain user level (which is increased by using the application in various ways), profile photo, hobbies, interests, and a collection of badges, which are earned by using the application and being "reviewed" by others aftering meeting. Users will have the option to login and make themselves available for hanging out with other nearby members, and other nearby members will appear in a search result list. When selecting someone, you can send them an invite to hangout. If the other member accepts, a direct chat is opened up. Once you meet, you can register in the app that you've met in person and started your hangout. Once finished, you close the hangout and credit the other person's personality using a limited number of points. For example, if the person was particularly humorous, you can credit their "funny" stat. This is directly linked to the badges system in which users can gain special badges by receiving a certain amount of points in a stat.

The application also includes an "events" list in which users can create or find relevant events near them to participate in and similarly review other users after the event is over.

## Project Guidelines

### Coding Style

This project uses ESLint to enforce modern JavaScript/TypeScript with the following rules:

- Single-quote for strings
- No semi-colons
- Enforced TypeScript

### Commits

All commit should include detailed messages for the individual file changes. VS Code version control GUI is useful for staging and adding commit messages to individual or small bundles of files.

### Working Branches

Create branches on your local repository that are suitably named (e.g., 'frontend').
Add the super master, super frontend, and super backend remotes from the organization repository.
Make your PR's to the frontend or backend branch of the super and **never** to the master.

### Conflict Avoidance

Ensure you are not modifying the same file as another member in order to avoid merge conflicts. Make use of LiveShare for pair programming or concurrent development.

### PR Guide

- Commit all files
- `git pull super master`
- `git push <local>`
- Open PR to corresponding super branch (frontend or backend)

Remember to **always** pull from the super master before pushing and making a PR.

## Front-End Design

### Screens

- Login
- Signup
  - E-Mail (private)
  - First Name
  - Last Name (private)
  - Phone Number (private)
  - Password
- Profile
  - Picture
  - Username
  - Badge Shocase
    - 3 Badges
  - Hobbies
    - Tags
  - Interests
    - Tags
  - Badge Collection
  - Sign Out (private)
  - Delete Account (private)
- User View
  - Hangout Toggle Overlay
  - Nearby Search Results
    - Profile Image
    - Tags
    - Badges
  - Off Toggle
  - Navigation
- Event List
  - Nearby Search Results
    - Title
    - Profile Images of Attendees
    - Related Tags
- Create Event
  - Title
  - Description
  - Tags
  - Image Upload
  - Place
  - Limit (2 to 50)
- Chat List
  - All Active Channels
- Chat
  - Messages
  - Input
  - Close

## Back-End Design

### Schema

#### Users (Array of Objects)

- User (Object)
  - first_name (string)
  - last_name (string)
  - email (string)
  - phone_number (string)
  - password_hash (string)
  - profile_photo (file)
  - tags (array of strings)
  - exp (integer)
  - lvl (integer)
  - stats (object)
    - funny (int)
    - intellectual (int)
    - fun (int)
    - kind (int)
    - therapeutic (int)
    - interesting (int)
  - chats (array of objects)
    - chat_id (int)
    - participants (array of objects)
      - first_name (string)
      - email (string)
      - profile_photo (file)
  - events (array of objects)
    - event_id (id)
    - is_creator (boolean)
  - sent_hangout_requests (array of objects)
    - first_name (string)
    - email (string)
    - profile_photo (string)
    - equipped_badges (array of strings)
  - received_hangout_requests (array of objects)
    - first_name (string)
    - email (string)
    - profile_photo (string)
    - equipped_badges (array of strings)
  - accepted_hangouts (array of objects)
    - first_name (string)
    - email (string)
    - profile_photo (string)
    - equipped_badges (array of strings)
  - ongoing_hangouts (array of objects)
    - id (string)
    - participants (array of objects)
      - first_name (string)
      - email (string)
      - profile_photo (string)
      - equipped_badges (array of strings)
  - pending_reviews (array of objects)
    - first_name (string)
    - email (string)
    - profile_photo (string)
  - longitude (int)
  - latitude (int)
  - token (string)

#### Messages (Array of Objects)

- chat_id (int)
- from (object)
  - email (string)
  - first_name (string)
  - profile_photo (string)
- timestamp (datetime)
- content (string)

#### Events (Array of Objects)

- Event (Object)
  - id (auto)
  - name (string)
  - description (string)
  - cover_photo (string)
  - creator (object)
    - first_name (string)
    - email (string)
    - profile_photo (file)
  - start (datetime)
  - end (datetime)
  - location (string)
  - limit (int)
  - tags (array of strings)
  - attendees (array of objects)
    - email (string)
    - first_name (string)
    - profile_photo (file)
  - comments (array of objects)
    - from (object)
      - email (string)
      - first_name (string)
      - profile_photo (file)
    - content (string)
    - timestamp (datetime)

#### Hangouts (Array of Objects)

- Hangout (object)
  - id (auto)
  - status (string)
  - participants (array of objects)
    - first_name (string)
    - email (string)
    - profile_photo (string)
    - equipped_badges (array of strings)

## Server

The server is made with <span style="color:lightblue">**Node/Express**</span> and is written in <span style="color:lightblue">**TypeScript**</span>. It contains <span style="color:lightblue">**WebSockets**</span> for live interactivity. Server calls are made through <span style="color:lightblue">**Axios**</span> and reach either a single REST endpoint for the Cloudinary upload or the <span style="color:lightblue">**GraphQL**</span> endpoint for database CRUD.

## Database

The database is <span style="color:lightblue">**MongoDB**</span> hosted by Atlas. The credentials are in your .env files. You can make use of <span style="color:lightblue">**Compass**</span> as a MongoDB Administrative GUI to see and live-edit data. Using the credentials in your .env, you'll have the information you need for setup.

## Cloud Storage

Cloud storage is provided by <span style="color:lightblue">**Cloudinary**</span>. Credentials, including an API key, are included in your .env file. There is currently no way to access the database itself without proper login credentials, so please refer to the tech lead for access. Keep in mind that the free tier will limit retrievals and uploads, so please keep these to a minimum during production.

## Game Mechanics

### Experience Curve

| Level | Experience |
| :---: | ---------- |
|   1   | 0          |
|   2   | 100        |
|   3   | 200        |
|   4   | 400        |
|   5   | 600        |
|   6   | 900        |
|   7   | 1200       |
|   8   | 1600       |
|   9   | 2000       |
|  10   | 3000       |

### Experience Gains

|        Action        | Experience |
| :------------------: | :--------: |
|    Create Account    |     0      |
|   Fill Out Profile   |     40     |
| Send Hangout Request |     10     |
|   Confirm Hangout    |     50     |
|    Finish Hangout    |     30     |
|    Submit Review     |     40     |
|     Create Event     |     20     |
|    Confirm Event     |     50     |

### Experience Multipliers

|      Condition      | Multiplier |
| :-----------------: | :--------: |
| Partner is level 1  |     3x     |
| Partner is level 10 |     3x     |

### Reviews

| Level | Review Points |
| :---: | :-----------: |
|   1   |       2       |
|   2   |       3       |
|   3   |       3       |
|   4   |       4       |
|   5   |       4       |
|   6   |       4       |
|   7   |       5       |
|   8   |       5       |
|   9   |       5       |
|  10   |       6       |

### Badge Thresholds

| Tier | Points Required |
| :--: | :-------------: |
|  1   |        1        |
|  2   |        5        |
|  3   |       15        |
|  4   |       30        |
