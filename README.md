
# Toolarmy Community Site Fixes

This is a [Tampermonkey](https://www.tampermonkey.net/) userscript that applies a collection of CSS style fixes and JavaScript behavior fixes, as well as a few new features. The following is a non-exaustive list of these changes.

## Changes

- Fix "Bookmarked" icon color on posts (now )
- Expandable main post textarea
- Expandable comment post textarea
- Improved styling in "Notifications/Discussions/Favorites/Direct Message/Points" section
    - Proper style indicator of clickable elements
    - Better coloring to show read/unread status more clearly at a glance
    - Remove cursor/pointer block on background ajax operations
    - Fix styling "Direct Message" menu to properly show an indicator of clickable elements
- Custom styled scrollbar for i-frame-like pop-ups
- Fixed image popup modal for comments with image assets
- Fixed dropdown/dropup menus everywhere to standardize their appearance
- "Like/Comment/Bookmark/Share" buttons on posts
  - Standardized appearance throughout the many different "versions" of posts that can be pulled up
  - Added hover state (except for "Like" on own posts, which now doesn't show the emoji popup b/c you cannot like your own post anyway)
  - Added "bookmarked" styling so you can see if you have a post bookmarked
- Added primary navigation (top nav and user nav) hover state
- Fixed "load more comments" styling (including a hover state)
- Fixed forum "filter by" dropdown
- Added ability to close modals by simply clicking outside the popup window (as is the case on almost every other site)

## New Features

- Full dark-mode styling for the site (can be optionally diabled)
- Updated post comment styling (also fixed a collection of prior display issues)
- Auto-like posts functionality added under Profile menu when on Feed or Community page

## Unresolved Issues

- Links remain broken throughout the site due to them not including proper `href` attributes and relyong soley on JavaScript (breaking the ability to right-click and `Open in New Tab`)
