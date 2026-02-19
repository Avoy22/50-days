/**
 * data.js
 * The complete 50-day behavioral dataset.
 *
 * Each object represents one day with the following fields:
 *   date     {string}  ISO 8601 date (YYYY-MM-DD)
 *   location {string}  City or place
 *   phase    {string}  System phase: Collapse | Reset | Relapse | Execution
 *   sleep    {number}  Hours of sleep (0 = sleepless night)
 *   bad      {number}  Hours of bad influence exposure
 *   waste    {number}  Hours of unproductive/wasted time
 *   work     {number}  Hours of deep, focused work
 *   mental   {string}  Subjective mental state label
 *   log      {string}  Single-line journal entry
 *
 * This array is referenced by all other JS modules via the global
 * window.DAYS variable set at the bottom of this file.
 */

const DAYS = [
  { date:"2026-01-01", location:"Dhaka",     phase:"Collapse",  sleep:6, bad:4, waste:10, work:0, mental:"Passive",     log:"Started the year with no direction." },
  { date:"2026-01-02", location:"Dhaka",     phase:"Collapse",  sleep:5, bad:6, waste:9,  work:0, mental:"Drained",     log:"Deactivated all social media to force focus." },
  { date:"2026-01-03", location:"Dhaka",     phase:"Collapse",  sleep:0, bad:8, waste:12, work:0, mental:"Unstable",    log:"Stayed out the whole night. Total system failure." },
  { date:"2026-01-04", location:"Dhaka",     phase:"Collapse",  sleep:6, bad:5, waste:8,  work:0, mental:"Passive",     log:"Tried to start working but failed to focus." },
  { date:"2026-01-05", location:"Dhaka",     phase:"Collapse",  sleep:4, bad:7, waste:11, work:0, mental:"Drained",     log:"Spent the day roaming aimlessly." },
  { date:"2026-01-06", location:"Dhaka",     phase:"Collapse",  sleep:0, bad:9, waste:13, work:0, mental:"Destroyed",   log:"Second night with zero sleep. Completely exhausted." },
  { date:"2026-01-07", location:"Dhaka",     phase:"Collapse",  sleep:6, bad:6, waste:9,  work:0, mental:"Passive",     log:"Recovering sleep but zero execution today." },
  { date:"2026-01-08", location:"Dhaka",     phase:"Collapse",  sleep:5, bad:4, waste:8,  work:0, mental:"Confused",    log:"Randomly downloading YouTube videos offline." },
  { date:"2026-01-09", location:"Dhaka",     phase:"Collapse",  sleep:6, bad:7, waste:10, work:0, mental:"Drained",     log:"Stayed outside most of the day with wrong crowd." },
  { date:"2026-01-10", location:"Dhaka",     phase:"Collapse",  sleep:0, bad:8, waste:14, work:0, mental:"Unstable",    log:"Third night without sleep. Routine is broken." },
  { date:"2026-01-11", location:"Dhaka",     phase:"Collapse",  sleep:7, bad:5, waste:7,  work:0, mental:"Passive",     log:"Made a minor attempt at coding but gave up." },
  { date:"2026-01-12", location:"Dhaka",     phase:"Collapse",  sleep:6, bad:6, waste:9,  work:0, mental:"Drained",     log:"No meaningful action taken today." },
  { date:"2026-01-13", location:"Dhaka",     phase:"Collapse",  sleep:5, bad:8, waste:10, work:0, mental:"Destroyed",   log:"Heavy exposure to bad company influence." },
  { date:"2026-01-14", location:"Dhaka",     phase:"Collapse",  sleep:6, bad:6, waste:7,  work:0, mental:"Confused",    log:"Opened VS Code but immediately closed it." },
  { date:"2026-01-15", location:"Dhaka",     phase:"Collapse",  sleep:6, bad:7, waste:9,  work:0, mental:"Drained",     log:"Mentally stuck and unable to execute." },
  { date:"2026-01-16", location:"Dhaka",     phase:"Collapse",  sleep:4, bad:6, waste:10, work:0, mental:"Passive",     log:"Mostly idle. No motivation to build." },
  { date:"2026-01-17", location:"Dhaka",     phase:"Collapse",  sleep:0, bad:9, waste:13, work:0, mental:"Destroyed",   log:"Lost all discipline again." },
  { date:"2026-01-18", location:"Dhaka",     phase:"Collapse",  sleep:7, bad:5, waste:8,  work:0, mental:"Confused",    log:"Tried to learn something new but got distracted." },
  { date:"2026-01-19", location:"Dhaka",     phase:"Collapse",  sleep:6, bad:7, waste:9,  work:0, mental:"Drained",     log:"Another day of full digital waste." },
  { date:"2026-01-20", location:"Dhaka",     phase:"Collapse",  sleep:6, bad:6, waste:8,  work:0, mental:"Passive",     log:"Random wandering around the city." },
  { date:"2026-01-21", location:"Dhaka",     phase:"Collapse",  sleep:5, bad:8, waste:11, work:0, mental:"Destroyed",   log:"Heavy influence exposure drained my energy." },
  { date:"2026-01-22", location:"Dhaka",     phase:"Collapse",  sleep:6, bad:7, waste:9,  work:0, mental:"Drained",     log:"Zero progress on any goals." },
  { date:"2026-01-23", location:"Dhaka",     phase:"Collapse",  sleep:6, bad:6, waste:7,  work:0, mental:"Confused",    log:"Tried planning out the next steps but no action." },
  { date:"2026-01-24", location:"Dhaka",     phase:"Collapse",  sleep:4, bad:7, waste:10, work:0, mental:"Passive",     log:"No system in place to guide my day." },
  { date:"2026-01-25", location:"Dhaka",     phase:"Collapse",  sleep:0, bad:8, waste:12, work:0, mental:"Destroyed",   log:"Mental low point. Need to escape this environment." },
  { date:"2026-01-26", location:"Dhaka",     phase:"Collapse",  sleep:6, bad:6, waste:7,  work:0, mental:"Confused",    log:"Actively thinking about leaving the city to reset." },
  { date:"2026-01-27", location:"Coxs Bazar",phase:"Reset",     sleep:5, bad:2, waste:6,  work:0, mental:"Reflective",  log:"Traveled to Cox's Bazar to escape bad habits." },
  { date:"2026-01-28", location:"Coxs Bazar",phase:"Reset",     sleep:8, bad:0, waste:3,  work:0, mental:"Overshadowed",log:"Walking by the sea. Finally got 8 hours of sleep." },
  { date:"2026-01-29", location:"Coxs Bazar",phase:"Reset",     sleep:8, bad:0, waste:2,  work:0, mental:"Reflective",  log:"Deep life reflection and journaling. Zero bad influence." },
  { date:"2026-01-30", location:"Train",     phase:"Reset",     sleep:4, bad:0, waste:5,  work:0, mental:"Tired",       log:"Took the train back to Dhaka." },
  { date:"2026-01-31", location:"Dhaka",     phase:"Relapse",   sleep:6, bad:4, waste:6,  work:0, mental:"Confused",    log:"Back in the city. Trying to keep my distance from bad habits." },
  { date:"2026-02-01", location:"Dhaka",     phase:"Relapse",   sleep:6, bad:3, waste:6,  work:0, mental:"Neutral",     log:"Last day successfully keeping social media off." },
  { date:"2026-02-02", location:"Dhaka",     phase:"Relapse",   sleep:5, bad:5, waste:8,  work:0, mental:"Relapsed",    log:"Reopened social media. Immediate waste of time." },
  { date:"2026-02-03", location:"Dhaka",     phase:"Relapse",   sleep:6, bad:6, waste:9,  work:0, mental:"Drained",     log:"Full scrolling relapse." },
  { date:"2026-02-04", location:"Dhaka",     phase:"Relapse",   sleep:6, bad:5, waste:7,  work:0, mental:"Conflicted",  log:"Trying to regain control over my attention." },
  { date:"2026-02-05", location:"Dhaka",     phase:"Relapse",   sleep:4, bad:6, waste:9,  work:0, mental:"Passive",     log:"Slipping back into old habits. No discipline." },
  { date:"2026-02-06", location:"Dhaka",     phase:"Relapse",   sleep:0, bad:7, waste:12, work:0, mental:"Destroyed",   log:"Mental exhaustion. Zero sleep." },
  { date:"2026-02-07", location:"Dhaka",     phase:"Relapse",   sleep:6, bad:6, waste:8,  work:0, mental:"Drained",     log:"Still stuck in the relapse loop." },
  { date:"2026-02-08", location:"Dhaka",     phase:"Relapse",   sleep:6, bad:5, waste:7,  work:0, mental:"Confused",    log:"Made a small attempt to get back on track." },
  { date:"2026-02-09", location:"Dhaka",     phase:"Relapse",   sleep:5, bad:6, waste:9,  work:0, mental:"Passive",     log:"No real progress. Just wasting hours." },
  { date:"2026-02-10", location:"Dhaka",     phase:"Relapse",   sleep:6, bad:4, waste:6,  work:0, mental:"Reflective",  log:"Thinking seriously about total detachment again." },
  { date:"2026-02-11", location:"Dhaka",     phase:"Relapse",   sleep:6, bad:5, waste:8,  work:0, mental:"Conflicted",  log:"The realization that I must change is growing strong." },
  { date:"2026-02-12", location:"Dhaka",     phase:"Execution", sleep:4, bad:2, waste:4,  work:1, mental:"Determined",  log:"TURNING POINT: Made the firm decision to detach from bad influence." },
  { date:"2026-02-13", location:"Dhaka",     phase:"Execution", sleep:7, bad:0, waste:2,  work:3, mental:"Focused",     log:"First real day of focus. Built the AvoyOS skeleton." },
  { date:"2026-02-14", location:"Dhaka",     phase:"Execution", sleep:8, bad:0, waste:1,  work:4, mental:"Clear",       log:"Bad influences cut off entirely. Coding dashboard logic." },
  { date:"2026-02-15", location:"Dhaka",     phase:"Execution", sleep:7, bad:0, waste:1,  work:5, mental:"Driven",      log:"Sleep is stable. Deep work feels natural now." },
  { date:"2026-02-16", location:"Dhaka",     phase:"Execution", sleep:8, bad:0, waste:0,  work:6, mental:"Optimized",   log:"Full execution mode. No social media." },
  { date:"2026-02-17", location:"Dhaka",     phase:"Execution", sleep:7, bad:0, waste:1,  work:6, mental:"Focused",     log:"Refining the CSS and UI. Environment is finally controlled." },
  { date:"2026-02-18", location:"Dhaka",     phase:"Execution", sleep:8, bad:0, waste:0,  work:7, mental:"Peak",        log:"Max output. System is working exactly as intended." },
  { date:"2026-02-19", location:"Dhaka",     phase:"Execution", sleep:8, bad:0, waste:0,  work:8, mental:"Unstoppable", log:"Project completed. 50-day turnaround achieved." },
];