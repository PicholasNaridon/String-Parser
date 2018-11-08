# String Parser

Hi Frontline team!

This is my take on string parser excercise that was sent over to me.

## Setup and Execution

No extra packages have been added that are necssary to run the scripts. You can start either with the commands below.

```
> $ npm run start:bonus 
> $ npm run start:basic 

```

## Assumptions:

- I removed leading spaces so that the alpha sorting works correctly.
- Multiple values can have children
- Children can have children
- Alpha sorting puts child elements immediately after parent 

## Thought process

I wanted to briefly explain how I went about tackling the problem. The first thing that came to mind when looking at the test string was that it looked lie a 2D array or a JSON object. You have a series of attributes with other attributes nested inside.

The first challenge was how around how to parse the data. In my first attempt I tried doing something where I changed all the opening and closing parenthesis to "+" and "-". After which I split the string into an array to iterate through. That left me with something like this:


```
[ '+',
  'id',
  'created',
  'employee',
  '+',
  'id',
  'firstname',
  'employeeType',
  '+',
  'id',
  '-',
  'lastname',
  '-',
  'location',
  '+',
  'city',
  'state',
  'zip',
  '-',
  'favcolor',
  '-' ]
  
  ```

I used those signs to keep track of the current "depth" of the items as well. I had a variable that was storing the current depth value, and whenever I came across a plus or a minus that value would be updated. From there I was able to append the items in the array to a string and add the right number of dashes based on my current depth.

That all kind of went out the window when I started working on a version that would alphabetize the output as well. I tried doing something similar where I was recording the depth, but now also a value called "parent node". I hoped that I could iterate through an array of objects, and then place the value in the correct spot based on the depth and parent node associated with the value.

I got to a point where I had an output like the example below, and just realized parsing through that to create a single alpha sorted list was going to be a challenge.

```
[ { depth: 1, val: 'id', parentNode: 'none' },
  { depth: 1, val: 'created', parentNode: 'none' },
  { depth: 1, val: 'employee', parentNode: 'none' },
  { depth: 1, val: 'location', parentNode: 'none' },
  { depth: 1, val: 'favcolor', parentNode: 'none' },
  { depth: 2, val: 'id', parentNode: 'employee' },
  { depth: 2, val: 'firstname', parentNode: 'employee' },
  { depth: 2, val: 'employeeType', parentNode: 'employee' },
  { depth: 2, val: 'lastname', parentNode: 'employee' } 
  { depth: 3, val: 'id', parentNode: 'employeeType' }, 
  { depth: 2, val: 'city', parentNode: 'location' },
  { depth: 2, val: 'state', parentNode: 'location' },
  { depth: 2, val: 'zip', parentNode: 'location' } 
]
```

From the begining it seemed like some sort of recursive function would make sense, but I always seem to struggle with them so I tried to avoid it. Ultimately that's the route I ended up taking. Instead of parsing the original string into an array or an array of objects, I wound up parsing it into a single object instead.

From there I went through and dumped out all the keys of the object, and iterated over the object using those keys. If the value associated with a key was equal to an empty string I just appended the key to a template literal for output. If the value associated with a key was equal to another object, I increased "depth" (still used for adding the dashes) and then called the same function again to iterate over the child value.



