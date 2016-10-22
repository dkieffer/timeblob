# Time Blob Overview
Time Blob is a time tracker. It’s a web app that gets served straight from your own Linux server running [Sandstorm](https//sandstorm.io). It can track metadata about your work session; it can track time for as many users as you add to your server. It can filter your sessions to analyze things like periods for billing. Time Blob has four main components for users:

#### Stopwatch
* Start and stop a timer for your work session
* Shows whether the timer is running
* Shows a real-time numerical display of elapsed time

#### Stopwatch Form
* Add metadata to your current session
* Editable, but pre-filled with previous entry’s data
* Dropdown menu suggestions as you type

#### List View: displays sessions from the database
* Add, Edit, or Remove sessions
* If edited can restore previous version of entry
* Filterable by metadata variables: Deleted, User (only for admins), Activity, Project, Client, Org, Rate, Date Range 

#### Settings
* TBD, but things like Time Formatting, Color Themes.
* Project Setup - Add and Edit Orgs., Clients, and Projects 


## Database Structure
* Row: Work Session
* Columms: Session ID, User, Activity, Project, Client, Org, Rate, Start, End, Time, Deleted, Edited, Submit Timestamp

## Users
* Users are completely administered by Sandstorm
* Regular Users cannot modify or see other user’s entries
* Admin Users have special abilities:
	* Filter the list view by users
	* Stopwatch Form And List View Form have a ‘user’ field (unless there is only one user)

## Feature Ideas
* Clock & Calendar Picker for editing start/stop time & date entries
* Time field should be able to handle multiple forms of entry, eg: "2:30", "2h 30m" etc.
* Blob-like animations throughout the app
* Allow admins to add custom columns to the DB
* Sorting. Is there any point?
* Totalling. When any filter is active, the bottom will display total time for the filtered entries.
* Without filters active, total could display time so far this week.
* Exporting txt, csv, or pdf reports