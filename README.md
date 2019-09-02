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
    
#### Chats (Array of Objects)
- Chat (Object)
    - participants (array of strings)
    - messages (array of objects)
        - time (timestamp)
        - from (string)
        - content (string)
    - closed (boolean)