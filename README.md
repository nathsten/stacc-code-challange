# Stacc code challenge 2021

## Description
> I chose to make a full-stack aplication consisting of an API that's searching for sanctions etc in your request, and an interactive front-end design that lets you verify the people and organizations that you're searching for. 

## How to run the project
1. Clone the repo.

2. Make sure to have nodejs installed:

        https://nodejs.org/en/

3. Run the following command:

    ````
    npm install
    ````

4. When all the dependencies is installed run this command to start the program:

    ````
    npm run start
    ````

5. Go to ````http://127.0.0.1:5050/````

## Desctiption of the code
You'll find the code for the API in 
````./app.js````
In my option the code is pretty much self explainatory, and comments are to be found to understand the code better.

In the following folder
````./util````
you'll find my utility functions, that does all the work.

````csvParser.js````
is my attempt to parse the pep.csv file into a readable JSON file.

````scan.js````
does most of the work for scanning people and organizations for sacntions etc. 

````sort.js````
consists of four functions to sort people from the CSV file. 

In the 
````./public````
folder, you'll find the front-end code for the interactive form. 

````./home````
Is the main landing page that lets you search people and orgs. 

````./seach````
is where you can seach in the CSV file based on name, email, occupation, and date of birth. 

## Previews
It was hard finding sanctioned people ect, but I made a few Sceenshots of how it would look in different results.

### Safe person

![Person safe](./images/Person_safe.png)

### Safe organization

![Org safe](./images/Org_safe.png)

### Sanctioned Person
![Person sanctioned](./images/Person_sanctioned.png)

### Organization bankrupt and a person within the company is sanctioned
![Bankrupt sanctioned](./images/Sanctioned_Bankrupt.png)


## Comments

> I found the pep.csv file hard to work with. It seemes like some people have a few more empty slots than others. Resulting in a twisted parsed file. For example parsing the first 500 was no problem, but after that birtdays kept showing up where the name should be, etc. Ended up just using the API.

> As mentioned above I don't think the provided API is up to date, becuase finding sanctioned people was harder than expected. 

> I also had to learn what KYC ment, and how it works. 

> I did't spend too much time on the front-end to make the page responsive etc, I was more focued on making a full stack aplication that works. 
