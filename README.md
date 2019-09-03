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
- `git pull super <frontend/backend>`
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
    - interests (array of strings)
    - exp (integer)
    - level (integer)
    - stats (object)
        - funny (int)
        - intellectual (int)
        - fun (int)
        - kind (int)
        - therapeutic (int)
        - interesting (int)
    - chats (object)
        - chat_id (int)
        - participants (array of objects)
            - first_name (string)
            - email (string)
            - profile_photo (file)
    - events (array of objects)
        - event_id (id)
        - is_creator (boolean)
    - imei (string)
    
#### Messages (Array of Objects)
- Message (Object)
    - participants (array of strings)
    - messages (array of objects)
        - chat_id (int)
        - from (object)
            - email (string)
            - first_name (string)
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
    - comments (array of objects)
        - from (object)
            - email (string)
            - first_name (string)
            - profile_photo (file)
        - content (string)
        - timestamp (datetime)