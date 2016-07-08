#Time Blob Project Outline
Time Blob is a time tracker

## A Form for Work Sessions
* A list of form fields (time, metadata, etc.)
* Start & Stop time and date autofill with stopwatch data
* Submit form button
* Tap to start editing
* Form field label select entire field on tap

#### Default Work Session Entry Fields
* Start Time & Date
* End Time & Date
* Activity
* Project
* Client
* Organization
* Length of Work Session


## A Stopwatch
* track the time spent on a work session
* Clock hand animation to show when the stopwatch is running
* Tap to start & pause
* A numerical display of total time elapsed


## A Database to store your records
* A Table of Work session entries
* Add and Remove Entries
* List View shows only Activity, Date, and Length of Session
* Click Entry to Edit
* On edit, auto expand to show all columns
* List view shows 20 Entries, Scroll at bottom to load 20 more
* Sorted by time & date


##Feature Ideas

#### General Ideas
* User Preferences (eg: time formatting, theme colors, etc.)
* UI Sound Effects
* Accessibility for visually impaired
* Stopwatch, Entry Form, and Database List viewed as three screens on mobile devices
* Simple one-click install
* Standalone App (use w/o browser)
* Server install / Cloud Syncing

#### Form Feature Ideas
* Autofill fields with previous work session data (except time data)
* As-you-type autofill Suggestions based on other database entries
* Form field select entire field on tap
* Auto focus on first form field after stopwatch starts
* Focusing on time field should pause stopwatch (if running)
* Clock & Calendar Picker for editing start/stop time & date entries
* Time field should be able to handle multiple forms of entry, eg: "2:30", "2h 30m" etc.

#### Stopwatch Feature Ideas
* 2 state clock hand- glowing while on, and darkened while stopped & paused
* A quick submit button (for small screens) that adds entry without having to scroll down to press submit

#### DB Feature Ideas
* Add Custom Columns
* Auto Fill Suggestions
* Clock & Calendar Picker for editing time & date entries
* Sorting: display entries in a specified order
* Filtering: display entries that match specific criteria
* Non destructive DB editing
* Totalling: Show the total amount of hours for selected entries

## UX Questions
* Should we allow for stopwatch "pausing"? If not then we can combine stopping the stopwatch and adding a record into a single action. If we do allow pausing, then it decouples the session's elapsed time, from the start and end time. Is this a bad thing? Would we need to add another hidden column for 'paused time'? The ability to pause might encourage sloppy time tracking practices.