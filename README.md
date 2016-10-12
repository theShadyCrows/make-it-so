# make-it-so

inverse kickstarter

WISHLIST:

User Authentication
 - FB/Google/hashing fn/etc.

Integrating users with the database
 - Rough draft of table is set in the backend (but it may need work)
 - Which user made which pledge? (bind it to id)
 - Maybe create a view for users where they could see their pledges and their claimed bounties

Keywords
 - This could be useful for search, etc
 - Table is set up in the backend for keywords and keywords-projects (it's a join table: see the schema diagram in assets)

Alerts/Modals
 - Modals would be great for the forms
 - Some sort of alerts would be useful to let the user know what action they just took

Media
 - Allow users to upload media when creating a project (images, mp3s, videos, etc)
 - This would need to be added to the db

Verified/Unverified Claimers
 - Make sure you know someone is the real bounty target before they take all that money

Real Money
 - Maybe use PayPal integration to accept real money?

Suggested Bounties
 - Keep track of popular bounties and suggest them to users to contribute to
