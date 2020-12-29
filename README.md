# SWENG-Visualisation-2

Visualiser for data taken from the Github API.

## What it does
Press the button to get a username prompt. The screen will then show 2 graphs pertaining to that username. The 2 graphs consist of:

#### Tree Graph of Languages
This graph shows the number of bytes of each language the user has logged across all repos. This elucidates which languages a programmer is proficient by showing how often they use that language when compared to other languages. The graph is scaled so that no language can be smaller than 1/500th the size of another to improve visualisation. This was done as some languages ie Dockerfile rarely ever get used so in comparison to Java on my profile would just be dwarfed.

#### Social Graph
This graph contains blue nodes which represent the repos belonging to the selected user. It also contains orange nodes which are the top 30 contributers in each of the repos. These orange nodes are then linked to all the repos that they have contributed to. This graph shows its full usefullness on larger profiles like Facebook and freecodecamp.

## How to install and run
Prerequsite of having **Docker** installed.
- Clone the repo and open the folder in terminal
- Copy `docker build -t some-name .` to terminal
- Copy `docker run -d -p 80:80 some-name` **Ensure this port is free in docker first**
- Open localhost on your browser
