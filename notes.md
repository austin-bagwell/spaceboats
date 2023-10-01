# 8/29

## 7am (hard in the paint this morning)

script roughly written to hit the getMyShips() endpoint and create a new row in the Ships table for each shipSymbol present. Very basic now, but as some point both the model and the script will be expanded so that I can add a ship with actual, useful details into the database. Can run when purchasing a new ship or as part of a 'weekly reset' automation helper thingy

also, hello, milestone... reading API data into a database with only minimal trouble this morning. spent most of my time (well, a lot of it at least) trying to figure out SQL commands to do table shit. my code is probably sketchy and is definitly not finished, but it wasn't an ordeal to sort out how to hit the API and then do the prisma magic to stick it in the db. cool cool cool

## 6am (yes i know it's early)

okay, got the most basic table created in the db... literally just two columns: SERIAL pk/id and a required ship_symbol string. did my db pull, generated an updated prisma client, and after inserting a ship into the db manually, tested with a query written using prisma. like magic, it worked.

so, now what?

The obvious answer is that I need to create a not insignificant amount of other tables to even be able to make any of this useful - systems? waypoints? ship cargo? idk, there is a lot to unpack there.

I think maybe a basic next step would be to add some sort of functionality to my 'reset' process in which I get a list of ships that I own from the API and then insert them into the db if they don't already exist (which they wouldn't if I had just restarted, no?)

# 8/28

## 9:30pm

going through prisma docs. got as far as 'add to existing project' > 'introspection' using the example tables shown in the docs tutorials. database is connected through the docker container spaceboats-db.

ran npx prisma generate for the tutorial tables

still need to do a fair bit of research to set up some basic tables for Ships etc. and then sort out a query to read my existing ships into said tables. not gonna do that tonight, but it's a good next step.

after that, maybe I'll take a stab at rewriting the automine routine to use OOP with my simple model of the ships I extended from the FleetAPI.

## < 8am

made a docker postgres container spaceboats-db
user: austin
pw: Twinkle19!
port: 5455

`npm i prisma, npx init prisma`

still need to make a test table so I can setup and test Prisma
dunno how to do that but I think it's time to make some coffee

# hooo buddy where to start

## automation

creating _easily_ callable routines for actions such as a mining run for ship
or sending a probe to explore the universe

the glaringly obvious question here is... how do I call these routines?

- via CLI, somehow

ultimately, it would be super cool to be able to enter `spaceboats run` into bash and
have all or some operations (mining, exploration) run as a background process while

### first steps

- [] automate a mining run
  - sort of check - kinda shitty way to do it but idk what else to do about it

## caching

would like to use Prisma/Postgres cache data about ships, systems, agents, etc.

## flow

instance of Ship makes a request

## notes

### Aug 20 8:05PM

experimenting with making a Ship class that extends the existing FleetAPI from @spacejunk
in theory, this will have all of the functionality of FleepAPI, but add a cooldown property
Each ship in my fleet will be instantiated to this class
methods called on those ships will automatically update the Ship's cooldown property
if cooldown is active, the ship will not be able to send a new request
alternatively, or in additon to, the class might have a 'status' property -
if status is on-cooldown, the Ship can be filtered out of whatever queue system
that I have yet to set up to schedules ships for actions.

- consider importing only specific methods needed specifically for ship actions from FleetAPI. No need to include things like getMyShips() or whatever. Those actions are not needed for individual instances of ships
