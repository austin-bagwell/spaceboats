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
