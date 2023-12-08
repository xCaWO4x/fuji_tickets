
# Important - !!
- ==Our Groups Iteration #1 code works now==
# Main Functionality
---
## As a Venue Manager (VM)

### Create Venue

#### What needs to be entered
- In order to create a venue,  the $VM$ must...
	1. Enter the venue name
	2. Enter the layout sections
		1. each section has the following
			1. a name/type (left, center or right )
			2. Number of Columns
			3. Number of Rows
	3. click on the `create` button
- After this is done, the venue will be created, with it's own `venueID` and `credentials`
### Delete Venue
- In order to delete a venue....
	1. click on the `delete` button for the `venue` button
- The venue will now be delete, as well as the venue manager
### Create Show
- To create a show, enter the following information
	1. The start date of the show
	2. the time the show starts
- after entering this information, click the `create` button to create the show
## As a Admin (A)

### Delete Show - done
1. Push button next to the show title that is labeled `delete`
2. Show will be erased and the page will be updated
### Generate Show Report - done
## VM and A
### Login
1. Enter credentials and push `login`
2. If valid: 
	1. VM- venueID will be returned and redirected to venue page containing the shows
	2. Admin - return true if valid and redirected to admin page
3. Otherwise error message will be displayed if credentials not valid

### Generate Show Reports
#### As Admin:
1. Select the `venue`
2. Push the `generate show reports` button 
3. Will be redirected to a page to display details
#### As VM:
1. Push the generate show reports button 
2. Will be redirected to a page to display details
## As a Customer

### Search Show
1. in order to search a show, type the first few letters of the show that you are trying to find in the search bar
2. This will direct you to a list of shows that start with your entered letters.
3. select you preferred show if it exists in the current venue
### List all active shows
1. Push the `list active shows button`
2. Will be redirected to a page to display all active shows at the venue
### Purchase Seats
1. Select one or more seats from the chart by clicking on the `seat`
1. To remove a seat click again
2. All selected seats will be displayed to the right
3. Click the `purchase` button to buy
1. If seats are available, they will be bought. The purchase will go through if only some seats can be bought

